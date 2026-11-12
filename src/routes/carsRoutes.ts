import {Router} from "express"
import {CarsController} from "@/controllers/carsController"
import { ensureAuthenticad } from "@/middlewares/ensureAuthenticated"

const carsRoutes = Router()

const carsControllers = new CarsController()

carsRoutes.use(ensureAuthenticad)

carsRoutes.get("/", carsControllers.index)
carsRoutes.get("/:plate", carsControllers.indexPlate)


carsRoutes.post("/", carsControllers.create)


export {carsRoutes}