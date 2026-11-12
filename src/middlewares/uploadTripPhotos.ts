import { randomUUID } from "node:crypto"
import { mkdirSync, promises as fs } from "node:fs"
import multer from "multer"
import { resolve } from "node:path"
import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppError"
import { z } from "zod"
import { prisma } from "@/database/prisma"

export const tripPhotosDirectory = resolve(process.cwd(), "uploads", "trips")

mkdirSync(tripPhotosDirectory, { recursive: true })

export async function ensureTripExists(request: Request, _response: Response, next: NextFunction) {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    const trip = await prisma.trip.findUnique({ where: { id } })

    if (!trip) {
        throw new AppError("Viagem não encontrada", 404)
    }

    return next()
}

const allowedTypes: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (_request, _file, callback) => callback(null, tripPhotosDirectory),
        filename: (_request, file, callback) => {
            callback(null, `${randomUUID()}${allowedTypes[file.mimetype] ?? ".img"}`)
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 10
    },
    fileFilter: (_request, file, callback) => {
        if (!allowedTypes[file.mimetype]) {
            return callback(new AppError("Formato inválido. Envie imagens JPEG, PNG ou WebP."))
        }

        return callback(null, true)
    }
})

const uploadMultiple = upload.array("photos", 10)

export function uploadTripPhotos(request: Request, response: Response, next: NextFunction) {
    uploadMultiple(request, response, (error: unknown) => {
        if (!error) {
            return next()
        }

        const files = (request.files ?? []) as Express.Multer.File[]
        const cleanup = files.map(file => fs.rm(file.path, { force: true }))

        Promise.allSettled(cleanup).then(() => {
            if (error instanceof multer.MulterError) {
                const message = error.code === "LIMIT_FILE_SIZE"
                    ? "Cada imagem pode ter no máximo 5 MB."
                    : "Envie no máximo 10 imagens no campo 'photos'."
                return next(new AppError(message))
            }

            return next(error)
        })
    })
}