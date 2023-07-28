import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import * as userController from "./user.controller.js"

const router = Router();

router.post('/signup', userController.signUp)
router.post('/signin',userController.signin)
router.put('/updateuser', auth(),userController.updateUser)
router.delete('/deleteuser',auth(), userController.deleteUser)
router.get('/',auth(), userController.getUserData)

export default router