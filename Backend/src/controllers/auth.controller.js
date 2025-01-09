import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import { generateToken } from '../utils/logger.js';
import cloudinary from '../lib/cloudinary.js';




//get all data

export const users = async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//create new User
export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const newUser = new User({ fullName, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginn = async (req, res) => {
    res.status(200).json({ message: 'Login successful' });
};

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }        
        if (password.lenght < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invaild user data" })
        }



    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    console.log("catch method askdfalsdfjalksdfjalksd");

    }
};


//Login User Api

export const login = async (req, res) => {
    const { email, password } = req.body
    // console.log("hwwllllsdfkjs", email, password)
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

// logout user

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout controller", error.message);   
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//update profile

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
        res.send("Hello World");
    }
    catch(error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}