import {Router} from "express"

import {usersRoutes} from "./usersRoutes"
import { sessionsRoute } from "./sessions"
const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoute)

export{routes}