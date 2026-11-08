import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import fileRouter from "./routes/fileRouter.js";

dotenv.config()
const PORT=process.env.PORT || 3000
const app= express();


app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/uploads",fileRouter)

async function StartServer(){
    await connectDB();
    app.listen(PORT,()=>{

    console.log(`PORT is running succesfully in server ${PORT}`)
})


}
StartServer();