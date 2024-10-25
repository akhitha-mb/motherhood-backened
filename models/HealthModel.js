import mongoose from 'mongoose';

const healthMetricsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model
        required: true,
    },
    systolicBP: {
        type: Number,
        required: false,
    },
    diastolicBP: {
        type: Number,
        required: false,
    },
    bloodSugar: {
        type: Number,
        required: false,
    },
    heartRate: {
        type: Number,
        required: false,
    },
    bodyTemperature: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the HealthMetrics model
const healthMetricsModel = mongoose.model('HealthMetrics', healthMetricsSchema);

export default healthMetricsModel;