import express from "express";
import * as allRouter from './modules/index.router.js'
import connectDB from './DB/connection.js'
import { config } from "dotenv";
config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use('/user',allRouter.userRouter)
app.use('/product',allRouter.producrRouter)
app.use('/blog',allRouter.blogRouter)

app.use('*',(req,res)=>{
    res.json({message:'404 page not found'})
})

app.listen(port, ()=>{
    console.log(`server running ... ${port}`)
})
