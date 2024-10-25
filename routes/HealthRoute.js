import express from 'express'
import { healthSave } from '../controller/HealthController.js'

const healthRouter = express.Router()

healthRouter.post('/add',healthSave)

export default healthRouter