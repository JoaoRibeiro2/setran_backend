import {Router} from "express"

import {tripsController} from "@/controllers/tripsController"
import { TripStatusController } from "@/controllers/tripStatusController"
import { TripPhotosController } from "@/controllers/tripPhotosController"

import {ensureAuthenticad} from "@/middlewares/ensureAuthenticated"

import { kmVerify } from "@/middlewares/kmVerify"
import { ensureTripExists, uploadTripPhotos } from "@/middlewares/uploadTripPhotos"


const tripsRoutes = Router()


tripsRoutes.use(ensureAuthenticad)


const tripsControllerInstance = new tripsController()
const tripsStatusControllerInstance = new TripStatusController()
const tripPhotosControllerInstance = new TripPhotosController()

tripsRoutes.get("/", tripsControllerInstance.index)
tripsRoutes.post("/", tripsControllerInstance.create)
tripsRoutes.post("/:id/photos", ensureTripExists, uploadTripPhotos, tripPhotosControllerInstance.create)
tripsRoutes.get("/:id/photos", tripPhotosControllerInstance.index)
tripsRoutes.get("/:id/photos/:photoId", tripPhotosControllerInstance.show)


tripsRoutes.put("/:id/status", tripsStatusControllerInstance.updateStatus)
tripsRoutes.put("/:id/update", tripsControllerInstance.update)

export {tripsRoutes}