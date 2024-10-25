import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const userLogin = async (req,res)=>{
    const {email, password} = req.body;
    console.log(email);
    
    try{
        const user = await userModel.findOne({ email: email});
        if(!user){
            res.json({success:false, message:"Email not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({success:false, message:"Invalid Password"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const userRegister = async (req, res) => {
    const { expectedDelivery, lifestyleDiseases, dob, email, name, password, doctor } = req.body;

    try {
        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format!" });
        }

        // Check if email already exists
        const existingUser  = await userModel.findOne({ email });
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
        const newUser  = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            dob: dob,
            doctor: doctor,
            expectedDelivery: expectedDelivery,
            lifestyleDiseases: lifestyleDiseases,
            checkupDates: [] // Initialize checkupDates as an empty array
        });

        // Save the new user
        const user = await newUser .save();

        // Calculate and assign checkup dates
        await assignCheckupDates(user);

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error in registering' });
    }
};

// Function to calculate and assign checkup dates
const assignCheckupDates = async (user) => {
    if (!user.expectedDelivery) {
        return; // No expected delivery date, so no checkup dates to assign
    }

    const checkupDates = [];
    const expectedDeliveryDate = new Date(user.expectedDelivery);
    const currentDate = new Date(); // Start from the date of birth or current date

    // Generate checkup dates every month until the expected delivery date
    while (currentDate < expectedDeliveryDate) {
        checkupDates.push(new Date(currentDate)); // Push a copy of the current date
        currentDate.setMonth(currentDate.getMonth() + 1); // Increment by one month
    }

    // Append the new checkup dates to the user's checkupDates array
    user.checkupDates = checkupDates; // Replace with the new array of checkup dates
    await user.save(); // Save the updated user document
};

const userView = async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers['authorization'];
          
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        // Verify the token
       // Verify the token and decode it
       let decoded;
       try {
           decoded = jwt.verify(token,process.env.JWT_SECRET); // Replace with your actual secret key
       } catch (err) {
           return res.status(403).json({ message: 'Token is invalid or expired' });
       }
        // Fetch the user from the database using the userId
        const user = await userModel.findById(decoded.id); // Assuming you have a User model

        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        // Respond with the expected delivery date and name
        res.json({
            expectedDelivery: user.expectedDelivery,
            name: user.name
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }

        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {userLogin, userRegister, userView}
