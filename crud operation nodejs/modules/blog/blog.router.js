import { Router } from "express"
import * as blogController from "./blog.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()


router.post("/addBlog", auth(), blogController.addblog);
router.get("/", blogController.getAllblogs);

export default router