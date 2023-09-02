import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

router.post("/", UserController.postUser)

export const UserRoutes = router