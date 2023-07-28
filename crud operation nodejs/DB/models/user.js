import mongoose, { Schema } from "mongoose"
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true 
    },
    age:{
        type:Number
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model("User" , userSchema)
export default userModel