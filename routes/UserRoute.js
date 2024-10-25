import express from 'express'
import { userRegister, userLogin, userView } from '../controller/UserController.js'

const userRouter = express.Router()

userRouter.post('/login',userLogin)
userRouter.post('/register',userRegister)
userRouter.get('/view',userView)

export default userRouter