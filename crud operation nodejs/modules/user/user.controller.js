import userModel from '../../DB/models/user.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/////////////// sign up //////////////////////////////
export const signUp = async (req, res) => {
        try {
          const { name, email, password, age } = req.body;
            const userCheck = await userModel.findOne({ email }); 
            if (userCheck) {
              res.json({ message: "email is already exist" });
            } else {
              const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
              const newUser = new userModel({
                name,
                email,
                password: hashPassword,
                age 
            });
              const savedUser = await newUser.save();
              if (savedUser) {
                res.json({ message: "signUp successfuly" });
              } else {
                res.json({ message: "sign up fail" });
              }
            }
         
        } catch (error) {
          console.log(error);
          res.json({ message: "error" ,error });
        }
      };
      //////////////////////////////// sign in  ////////////////////
      export const signin = async (req, res) => {
        try {
          const { email, password } = req.body;
          const userCheck = await userModel.findOne({ email });
          if (userCheck) {
            const checkMatch = bcrypt.compareSync(password, userCheck.password);
            if (checkMatch) {
              const token = jwt.sign(
                { id: userCheck._id, email: userCheck.email , name: userCheck.name},
                process.env.TOKEN_SIGNATURE,
              );
              res.json({ message: "Login Successfuly", token  });
            } else {
              res.json({ message: "invalid information" });
            }
          } else {
            res.json({ message: "invalid information" });
          }
        } catch (error) {
          console.log(error);
          res.json({ message: "catch error"},error);
        }
      };
           //////////////////////////////// update user ////////////////////
           export const updateUser = async (req,res)=>{
            try{
                const {name , age , email , password}=req.body;
                const { _id } = req.user;
                const userCheck = await userModel.findOne({_id})
                if(userCheck){
                }
                const updateUser = await userModel.updateOne({_id},{name,age,email,password})
                if(updateUser.modifiedCount){
                    res.json({message:'updated successfuly' , data:updateUser})
                }else{
                    res.json({message:'can not find this user' , data:updateUser})
                }
            }catch(error){
                res.json({message:'error',error})
            }
        }
        //////////////////////////////////////  delete user  ////////////////////////
export const deleteUser = async (req,res)=>{
  try{
    const { _id } = req.user;
    const deleteUser = await userModel.deleteOne({_id})
      if(deleteUser.deletedCount){
          res.json({message:'deleted successfuly'})
      }else{
          res.json({message:'can not find this user' , deleteUser})
      }

  }catch(error){
      res.json({message:'error',error})
  }
}

        //////////////////////////////////////   get  user  ////////////////////////
export const getUserData = async (req,res)=>{
  try{
      const { _id } = req.user;
      const user = await userModel.findOne({_id});
      if(user){
          res.json({message:'Done' , user})
      }else{
          res.json({message:'No user'})
      }

  }catch(error){
      res.json({message:'error',error})
  }
}