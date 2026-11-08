import {Router} from "express";
import { UserController } from "../controllers/userController.js";
import AuthMiddleWare from "../middlewares/AuthMiddleware.js"
const userRouter=Router();
const userController=new UserController();

userRouter.post("/register",userController.userRegis.bind(userController));
userRouter.post("/login", userController.userLogin.bind(userController));
userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/profile",AuthMiddleWare, userController.getUserProfile);
userRouter.put("/update",AuthMiddleWare,userController.updateProfile);
userRouter.delete("/delete",AuthMiddleWare,userController.deleteUser);
export default userRouter;