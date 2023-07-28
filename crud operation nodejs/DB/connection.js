import mongoose from 'mongoose'

const connectDB =async ()=>{
    return await mongoose.connect('mongodb://0.0.0.0:27017/app2')
    .then(res=>{
        console.log('connect to DB')
    }).catch(err=>{console.log('fail to connect to DB')})
}

export default connectDB