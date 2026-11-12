import {Request, Response} from "express"
import {prisma} from "@/database/prisma"

import {z} from "zod"
import { AppError } from "@/utils/AppError"

import { authConfig } from "@/config/auth"
import {compare} from "bcrypt"
import {sign} from "jsonwebtoken"



class SessionControler{



    async create(request: Request, response: Response){
         const bodySchema = z.object({
            registration: z.string(),
            password: z.string()
        })

        const {registration,password} = bodySchema.parse(request.body)
        
        const user = await prisma.user.findFirst({
            where: {register: registration}
        })

        if(!user){
            throw new AppError("Invalid registration or password", 401)
        }
        
        const passwordMached = await compare(password, user.passwordHash)

        if(!passwordMached){
            throw new AppError("Invalid registration or password", 401)
        }

        const {secret, expiresIn} = authConfig.jwt
    
        const token = sign({role: user.role}, secret, {
            subject: user.register,
            expiresIn
        })

        const {passwordHash: hashedPassword, ...userWithoutPassword} = user

        return response.json({
            token,
            ...userWithoutPassword
        })
    }
}

export { SessionControler}