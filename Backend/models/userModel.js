import mongoose from "mongoose"; 


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    type: {
        type: Number,
        default: 0,  // 0 means user
    },
    
},{timestamps: true});



export default mongoose.model("User",userSchema);