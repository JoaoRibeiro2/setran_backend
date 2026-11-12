import {Router} from "express"

import { ReportController } from "@/controllers/reportsController"
import { ensureAuthenticad } from "@/middlewares/ensureAuthenticated"

const reportRoutes = Router()
const reportesController = new ReportController

reportRoutes.use("/", ensureAuthenticad, reportesController.create)

export {reportRoutes}