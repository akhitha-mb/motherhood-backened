// import express from 'express';
// import User from '../models/UserModel.js'; // Ensure the path to your model is correct

// const router = express.Router();

// // Route to fetch patients for a specified doctor
// router.get('/view', async (req, res) => {
//     const { doctorId } = req.query; // Extract doctorId from query parameters

//     try {
//         // Find users where selectedDoctorId matches the provided doctorId
//         const users = await User.find({ selectedDoctorId: doctorId });

//         res.status(200).json(users); // Send filtered user data in response
//     } catch (error) {
//         console.error('Error fetching patients:', error);
//         res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
//     }
// });

// export default router;
import express from "express";
import User from "../models/UserModel.js"; // Ensure the path to your model is correct

const router = express.Router();

// Route to fetch patients for a specified doctor by doctor's name
router.get("/view", async (req, res) => {
  const { doctorName } = req.query; // Extract doctorName from query parameters
  console.log(doctorName);

  try {
    // Check if doctorName is provided
    if (!doctorName) {
      return res
        .status(400)
        .json({ status: "error", message: "Doctor name is required." });
    }

    // Find users where the doctor field matches the provided doctorName
    const users = await User.find({ doctor: doctorName });

    if (users.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No patients found for the specified doctor.",
      });
    }

    res.status(200).json(users); // Send filtered user data in response
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({
      status: "error",
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
