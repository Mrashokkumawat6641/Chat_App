import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6, 
        select: false 
    },  
    profilePic: { 
        type: String,
        default: "",
    }
}, { timestamps: true });

export default mongoose.model('Users', UserSchema);

