import { Request, Response, NextFunction } from "express"
import { promises as fs } from "node:fs"
import { basename, resolve } from "node:path"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { tripPhotosDirectory } from "@/middlewares/uploadTripPhotos"

class TripPhotosController {
    async create(request: Request, response: Response) {
        const paramsSchema = z.object({ id: z.string().uuid() })
        const { id: tripId } = paramsSchema.parse(request.params)
        const files = (request.files ?? []) as Express.Multer.File[]

        if (files.length === 0) {
            throw new AppError("Envie pelo menos uma imagem no campo 'photos'.")
        }

        try {
            const paths = files.map(file => `uploads/trips/${file.filename}`)

            const photos = await prisma.$transaction(async transaction => {
                await transaction.tripPhoto.createMany({
                    data: paths.map(path => ({ path, tripId }))
                })

                return transaction.tripPhoto.findMany({
                    where: { tripId, path: { in: paths } },
                    orderBy: { createdAt: "asc" }
                })
            })

            return response.status(201).json({
                photos: photos.map(photo => ({
                    id: photo.id,
                    url: `/trips/${tripId}/photos/${photo.id}`,
                    createdAt: photo.createdAt
                }))
            })
        } catch (error) {
            await Promise.all(files.map(file => fs.rm(file.path, { force: true })))
            throw error
        }
    }

    async index(request: Request, response: Response) {
        const paramsSchema = z.object({ id: z.string().uuid() })
        const { id: tripId } = paramsSchema.parse(request.params)

        const trip = await prisma.trip.findUnique({ where: { id: tripId } })
        if (!trip) {
            throw new AppError("Viagem não encontrada", 404)
        }

        const photos = await prisma.tripPhoto.findMany({
            where: { tripId },
            orderBy: { createdAt: "asc" }
        })

        return response.json({
            photos: photos.map(photo => ({
                id: photo.id,
                url: `/trips/${tripId}/photos/${photo.id}`,
                createdAt: photo.createdAt
            }))
        })
    }

    async show(request: Request, response: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string().uuid(),
            photoId: z.string().uuid()
        })
        const { id: tripId, photoId } = paramsSchema.parse(request.params)

        const photo = await prisma.tripPhoto.findFirst({
            where: { id: photoId, tripId }
        })

        if (!photo) {
            throw new AppError("Foto não encontrada", 404)
        }

        const filePath = resolve(tripPhotosDirectory, basename(photo.path))
        return response.sendFile(filePath, error => {
            if (error) {
                next(error)
            }
        })
    }
}

export { TripPhotosController }