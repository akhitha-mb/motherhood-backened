import express from 'express'
import cors from 'cors'
import { connection } from './config/db.js'
import 'dotenv/config'
const app = express()
const port = 8080
import userRouter from './routes/UserRoute.js'
import healthRouter from './routes/HealthRoute.js'
import doctorRouter from './routes/DoctorRouter.js'

app.use(express.json())
app.use(cors())

//db connection
connection()

//api endpoint for user router
app.use('/api/user',userRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/health',healthRouter)

app.get("/",(req,res)=>{
    res.send('hi')
})

app.listen(8080,()=>{
    console.log("Server running");
    
})