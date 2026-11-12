import { Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/AppError"
import { describe } from "node:test"
import { kmVerify } from "@/middlewares/kmVerify"

class tripsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            plate: z.string(),
            driverId: z.string(),
            kmStart: z.number(),
            kmEnd: z.number().optional(),
            endDate: z.date().optional(),
            description: z.string().optional()
        })
        const {plate, driverId, kmStart, kmEnd, description} = bodySchema.parse(request.body)
        
        const car = await prisma.cars.findFirst({
            where: {plate: plate}
        })
        const tripsInprogress = await prisma.trip.findFirst({
            where: {
                carId: car.id,
                status: "IN_PROGRESS"
            }
        })

        if(tripsInprogress){
            throw new AppError("Veículo está sendo utilizado")
        }

        
        if(!car){
            throw new AppError("Car not found", 404)
        }

        if(car.kmCurrent > kmStart){
            throw new AppError("Kilometragem inicial deve ser igual ou menor a atual")
        }
        // const kmStart = car.kmCurrent
        const trip = await prisma.trip.create({
            data: {
                kmInitial: kmStart,
                kmFinal: kmEnd,
                carId: car.id,
                userRegister: driverId,
                description
            }
        })
        return response.json("Viagem iniciada")
    }

    async index(request: Request, response: Response){
        const trips = await prisma.trip.findMany() 

        return response.json({
            viagens: trips
        })
    }

    async update(request: Request, response: Response){
        const paramsSchema = z.object({
            id: z.string().uuid(),

        })

        const bodySchema = z.object({
            kmFinal : z.number().optional(),
            description: z.string().optional(),
            userRegister: z.string().optional(),
            fuel: z.enum(["NOT", "YES"]).optional()

        })

        const {id} = paramsSchema.parse(request.params)
        const {kmFinal, description, userRegister, fuel} = bodySchema.parse(request.body)

        const trip = await prisma.trip.findUnique({
            where: {id}
        })

            if(trip.status === "COMPLETED"){
                throw new AppError("Esta viagem já finalizada")
            }
        
        if(kmFinal <= trip.kmInitial){
            throw new AppError("A kilometragem final deve ser maior do que a inicial")
        }
        await prisma.trip.update({
            data: {
                kmFinal: kmFinal,
                description: description,
                userRegister: userRegister,
                Fuel: fuel
            },
            where: {id}
        })

        return response.json("Dados atualizados")
    }



    
    }

export {tripsController}