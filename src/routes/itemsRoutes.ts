import {Router} from "express"
import { ItemsController } from "@/controllers/itemsController"


const itemsRoutes = Router()
const itemsConstat = new ItemsController()


itemsRoutes.post("/", itemsConstat.create)
itemsRoutes.get("/", itemsConstat.index)
itemsRoutes.post("/:plate", itemsConstat.createItemCars)
export {itemsRoutes}