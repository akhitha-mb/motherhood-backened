import express from 'express'
import { doctorRegister, doctorLogin } from '../controller/DoctorController.js'

const doctorRouter = express.Router()

doctorRouter.post('/login',doctorLogin)
doctorRouter.post('/register',doctorRegister)

export default doctorRouter