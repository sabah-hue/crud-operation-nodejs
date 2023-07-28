import mongoose, { Schema } from "mongoose";

const productSchema =new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number
    },
    desc:{
        type:String,
        require:true   
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const productModel = mongoose.model('Product', productSchema)
export default productModel