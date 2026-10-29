import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {hash} from "bcrypt"
import {z} from "zod"
import { AppError } from "@/utils/AppError"

class UsersController{
    async create(request: Request, response: Response){
        
    const bodySchema = z.object({
        register: z.string().max(5),
        name: z.string().trim().min(4),
        password: z.string().min(6),
        photo: z.string().optional(),
        email: z.string().email().optional(),
        position: z.enum(["TRAFFIC_AGENT", "OPERATIONS_AGENT"]).optional(),
        role: z.enum(["USER", "ADMIN"]).optional()
    })

    const {register, name, password, photo, email, position, role } = bodySchema.parse(request.body)

    const hashedPassword = await hash(password, 8)
    
    const user = await prisma.user.create({
            data: {
                register,
                name,
                passwordHash: hashedPassword,
                photo,
                email,
                position,
                role
            }
        })
    const{passwordHash: _, ...userWithoutPassword } = user

    return response.status(201).json(userWithoutPassword)
    }
}

export {UsersController}