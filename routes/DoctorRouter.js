import express from 'express'
import { doctorRegister, doctorLogin } from '../controller/DoctorController.js'

const doctorRouter = express.Router()

doctorRouter.post('/dlogin',doctorLogin)
doctorRouter.post('/register',doctorRegister)

export default doctorRouter