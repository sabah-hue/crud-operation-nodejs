import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    content:{
        type:String,
        require:true
    },
    addedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        require:true
    }
},{
    timestamps:true
})

const blogModel = mongoose.model('Blog', blogSchema)
export default blogModel