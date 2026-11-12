import {Request, Response, NextFunction} from "express"
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import {z} from "zod"

async function kmVerify(
    request: Request,
    response: Response,
    next: NextFunction
){
        const paramsSchema = z.object({
            id: z.string().uuid().optional(),
        })

        const bodySchema = z.object({
            plate: z.string().optional(),
            kmFinal: z.number()
        }).refine(data => data.plate !== undefined || request.params.id !== undefined, {
            message: "Informe o Id ou placa do veículo"
        })

        const {id} = paramsSchema.parse(request.params)
        const {plate, kmFinal} = bodySchema.parse(request.body)


    const car = id 
    ? await prisma.cars.findUnique({ where: {id}})
    : await prisma.cars.findFirst({where: {plate}})

    if(!car){
        throw new AppError("Veículo não encontrado", 404)
    }

    if(kmFinal < car.kmCurrent){
        throw new AppError("A kilometragem final deve ser maior do que a inicial")
    }

    return next()
}

export {kmVerify}