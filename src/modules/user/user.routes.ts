import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

router.post("/", UserController.postUser).get('/', UserController.getUser)

export const UserRoutes = router