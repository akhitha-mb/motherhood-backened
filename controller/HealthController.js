import healthMetricsModel from "../models/HealthModel.js";
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for token management

const healthSave = async (req, res) => {
  try {
    // Extract the token from the request
    const token = req.body.token;

    // Validate the token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode the token to get the user ID
    let userId;
    try {
      const decoded = jwt.verify(token, "secret#1234"); // Replace with your actual secret key
      userId = decoded.id; // Assuming the user ID is stored in the token
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract the form data from the request
    const { systolicBP, diastolicBP, bloodSugar, heartRate, bodyTemperature } = req.body;

    // Create a new healthMetricsModel instance
    const healthMetrics = new healthMetricsModel({
      systolicBP,
      diastolicBP,
      bloodSugar,
      heartRate,
      bodyTemperature,
      userId, // Use the decoded user ID
    });

    // Save the healthMetricsModel instance to the database
    await healthMetrics.save();

    // Return a success response
    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving health metrics:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { healthSave };