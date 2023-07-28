import { Router } from "express"
import * as productController from "./product.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()


router.post("/addproduct", auth(), productController.addProduct);
router.put("/:productId", auth(), productController.updateProduct);
router.delete("/:productId", auth(), productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/:_id", productController.getById);

export default router