import {Router} from "express"

import {usersRoutes} from "./usersRoutes"
import { sessionsRoute } from "./sessions"
import { reportRoutes } from "./reportsRoutes"
import {carsRoutes} from "./carsRoutes"
import {tripsRoutes} from "./tripsRoutes"
import { itemsRoutes } from "./itemsRoutes"


const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoute)
routes.use("/reports", reportRoutes)
routes.use("/cars", carsRoutes)
routes.use("/trips", tripsRoutes)
routes.use("/items", itemsRoutes)



export{routes}