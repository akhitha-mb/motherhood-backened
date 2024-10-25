import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true }, // in years
    hospital: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    // checkupDates: { type: [Date], default: [] } // if needed for future use
}, { timestamps: true });

const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;