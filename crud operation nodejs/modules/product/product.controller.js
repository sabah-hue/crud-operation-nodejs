import productModel from "../../DB/models/product.js";
import userModel from "../../DB/models/user.js";

/////////////////////////  add product ////////////////////////////
export const addProduct = async (req, res, next) => {
  try {
    const { name, price, desc } = req.body;
    const { _id } = req.user;

    const newProduct= new productModel({ name, price, desc, createdBy: _id });
    const saveProd = await newProduct.save();
    saveProd? res.json({ message: "Done", saveProd }): res.json({ message: "Fail" });
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" , error });
  }
};
///////////////////////////////// update product ////////////////////////
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    const { name, price, desc } = req.body;
    const product = await productModel.findById(productId);
    if ( _id == product.createdBy.toString()) {
      await productModel.updateOne({ _id: productId }, { name, price, desc });
      res.json({ message: "done" } );
    } else {
      res.json({ message: "not allow , unauthorized user" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error"} , error);
  }
};
////////////////////////////////////// delete product ///////////////////////
export const deleteProduct = async (req,res)=>{
  try{
      const {productId} = req.params; 
      const {_id}=req.user; 

      const product = await productModel.findById(productId);
        if ( _id == product.createdBy.toString()) {
          await productModel.deleteOne({ _id: productId });
          res.json({ message: "done" } );
        } else {
          res.json({ message: "not allow , unauthorized user" });
        }
  }
  catch(error){
      res.json({message:'error' , error})
  }
}
//////////////////////////////////////  all product ///////////////////////
export const getAllProducts = async (req, res) => {   // by populate
try {
  const allproducts = await productModel.find().populate([
      { path: 'createdBy',model: userModel}])
  if (allproducts.length) {
    res.json({ message: "Done", allproducts });
  } else {
    res.json({ message: "no products" });
  }
} catch (error) {
  res.json({ message: "error"  , error});
}
};

// export const getAllProducts = async (req, res) => {  // by lookup
//     try {
//       const allproducts = await productModel.aggregate([
//         {$lookup: {
//             from: 'users',
//             localField: 'createdBy',
//             foreignField: '_id',
//             as: 'owner',
//           },
//         },
//       ]);
//       if (allproducts.length) {
//         res.json({ message: 'Done', data:allproducts });
//       } else {
//         res.json({ message: 'No products' });
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({ message: 'error' });
//     }
//   };

//////////////////////////////////////  get product by id ///////////////////////
export const getById = async (req,res)=>{
  try{
      const {_id} = req.params; // product id 
      const product = await productModel.findOne({_id})
      if(product){
              res.json({message:'done' , product})
          }else{
              res.json({message:'no product found'})
      }
  }
  catch(error){
      res.json({message:'error' , error})
  }
}

