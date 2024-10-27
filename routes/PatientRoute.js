import express from 'express';
import userModel from '../models/UserModel.js';

const router = express.Router();

// Route to fetch patients for a specific doctor by name
router.get('/view', async (req, res) => {
    const { doctor } = req.query; // Get doctor name from query parameters

    try {
        const users = await userModel.find({ doctor }); // Fetch patients associated with the doctor
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
    }
});

export default router;
