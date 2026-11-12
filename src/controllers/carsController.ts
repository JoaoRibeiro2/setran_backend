import { Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/AppError"



class CarsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            type: z.string().optional(),
            marca: z.string().min(3),
            model: z.string().min(3),
            plate: z.string().min(7),
            kmCurrent: z.number()

        })

        const {type, marca, model, plate, kmCurrent} = bodySchema.parse(request.body)

        const carWithSamePlate = await prisma.cars.findFirst({
            where: {plate}
        })

        if(carWithSamePlate){
            throw new AppError("Car with same plate already exist")
        }

        const car = await prisma.cars.create({
            data: {
                carType: type,
                marca,
                model,
                plate,
                kmCurrent
            }
        })
        return response.json({message: "Created",
            car
        })
    }   

    async index(request: Request, response: Response){

        const cars = await prisma.cars.findMany()
        return response.json(cars)
    }

    async indexPlate(request: Request, response: Response){
        
        const paramsSchema = z.object({
            plate: z.string()
        })    
        const {plate} = paramsSchema.parse(request.params)

        const car = await prisma.cars.findFirst({

            where: {
                plate: plate
            },
            include: {
                item: {
                    select: {
                        item: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return response.json(car)
    }
}

export {CarsController}