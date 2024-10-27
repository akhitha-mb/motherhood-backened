import express from 'express';
import cors from 'cors';
import { connection } from './config/db.js';
import 'dotenv/config'; // Load environment variables from .env file
import userRouter from './routes/UserRoute.js';
import healthRouter from './routes/HealthRoute.js';
import doctorRouter from './routes/DoctorRouter.js';
import doctordashRouter from './routes/Doctordashrouter.js'; // Corrected import path for Doctordashrouter

const app = express();
const port = process.env.PORT || 8080; // Use port from environment variable or fallback to 8080

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Database connection
connection();

// API endpoints for different routers
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/health', healthRouter);
app.use('/api/patientview', doctordashRouter); // Consistent naming and correct variable name

// Simple root endpoint
app.get("/", (req, res) => {
    res.send('hi');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
