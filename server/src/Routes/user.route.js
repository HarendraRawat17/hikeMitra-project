import { Router } from "express";
import { otpVerificationController, registerController } from "../controllers/userController.js";
import { upload } from "../Middlewares/multer.middleware.js";


const router = Router();

router.route('/register').post(
   upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "converImage",
      maxCount: 1
    }
  ]),
  registerController)

 router.route('/otp-verify').post(otpVerificationController)

export default router