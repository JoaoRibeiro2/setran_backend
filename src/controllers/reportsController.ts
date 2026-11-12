import { Request, Response} from "express"
import {prisma} from "@/database/prisma"


class ReportController{
    create(request: Request, response: Response){
        return response.json({message: "Ok"})
    }
}

export {ReportController}