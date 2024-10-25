import doctorModel from "../models/DoctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// User login function
const doctorLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    
    try {
        const user = await doctorModel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "Email not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }
        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error" });
    }
};

// Token creation function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User registration function
const doctorRegister = async (req, res) => {
    const { name, email, password, specialization, qualification, experience, hospital, phoneNumber } = req.body;
    console.log('hi')
    try {
        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format!" });
        }

        // Check if email already exists
        const existingUser  = await doctorModel.findOne({ email });
        if (existingUser ) {
            return res.json({ success: false, message: "User  email already exists!" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with the new fields
        const newUser  = new doctorModel({
            name,
            email,
            password: hashedPassword,
            specialization,
            qualification,
            experience,
            hospital,
            phoneNumber
        });

        // Save the new user
        const user = await newUser .save();

        // Token creation
        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Error in registering' });
    }
};

// Exporting the functions
export { doctorLogin, doctorRegister };