import {Router} from "express"
import { SessionControler } from "@/controllers/sessionsController"

const sessionsRoute = Router()
const sessionsControler = new SessionControler

sessionsRoute.use("/", sessionsControler.create)


export {sessionsRoute}