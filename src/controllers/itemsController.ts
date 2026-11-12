import { Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/AppError"


class ItemsController{
    async create(request: Request, response: Response){


        const bodySchema = z.object({
            name: z.string(),
            description: z.string().optional()
        })

        const {name, description} = bodySchema.parse(request.body)


        const item = await prisma.item.create({
            data: {
                name,
                description
            }
        })

        return response.json(item)
    }

    async createItemCars(request: Request, response: Response){
        
        const bodySchema = z.object({
            name: z.string(),
            status: z.enum(["GOOD", "ATTENTION", "DAMAGED", "NOT_CHECKED"]).optional()
        })
        const paramsSchema = z.object({
            plate: z.string().min(7)
        })

        const {name, status} = bodySchema.parse(request.body)
        const {plate} = paramsSchema.parse(request.params)


        const car = await prisma.cars.findFirst({
            where: {
                plate: plate
            }
            
        })

        const item = await prisma.item.findFirst({
            where: {
            name: name
            }
        })

        const itemCar = await prisma.carItems.create({
            data: {
                carId: car.id,
                ItemId: item.id,
                status: status
            }
        })

        return response.json({
            
            vehicle: car.model,
            item: item.name,
            itemCars: itemCar
        })
    }

    async index(request: Request, response: Response){


        const cars = await prisma.item.findMany() 

        return response.json(cars)
    }


}

export {ItemsController}