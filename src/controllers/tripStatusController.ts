import { Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/AppError"
    
    

class TripStatusController{
    async updateStatus(request: Request, response: Response){
        const paramsSchema = z.object({
            id: z.string().uuid(),

        })

        const bodySchema = z.object({
            status: z.enum([ "IN_PROGRESS","COMPLETED","CANCELLED"]),
        })

        const {id} = paramsSchema.parse(request.params)
        const {status,} = bodySchema.parse(request.body)
        const result = await prisma.$transaction(async (tx) => {
            const trip = await tx.trip.findUnique({
                where: { id },
            })
            if(trip.status === "COMPLETED"){
                throw new AppError("Viagem finalizada")
            }
            if (!trip) {
                throw new AppError("Viagem não encontrada", 404)
            }

            if (status === "COMPLETED" && trip.kmFinal === null) {
                throw new AppError("Quilometragem final não registrada")
            }

            const updatedTrip = await tx.trip.update({
                where: { id },
                data: { status },
            })

            let updatedCar = null

            if (status === "COMPLETED") {
                updatedCar = await tx.cars.update({
                    where: { id: trip.carId },
                    data: {
                        kmCurrent: trip.kmFinal,
                    },
                })
            }

            return { updatedTrip, updatedCar }
        })

        return response.json({
            message: "Atualizado",
            trip: result.updatedTrip,
            car: result.updatedCar,
        })
    }
       
    }


export {TripStatusController}
