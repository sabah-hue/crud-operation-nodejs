import blogModel from "../../DB/models/blog.js";
import userModel from "../../DB/models/user.js";

/////////////////////////  add blog ////////////////////////////
export const addblog = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { _id } = req.user;

    const newblog= new blogModel({ content, addedBy: _id });
    const saveblog = await newblog.save();
    saveblog? res.json({ message: "Done", saveblog }): res.json({ message: "Fail" });
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" , error });
  }
};

//////////////////////////////////////  all blogs ///////////////////////
export const getAllblogs = async (req, res) => {   
try {
  const allblogs = await blogModel.find().populate([
      { path: 'addedBy',model: userModel}])
  if (allblogs.length) {
    res.json({ message: "Done", allblogs });
  } else {
    res.json({ message: "no blogs" });
  }
} catch (error) {
  res.json({ message: "catch error"  , error});
}
};


