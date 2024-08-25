import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30 mb", extended: true}));
app.use(express.urlencoded({limit: "30 mb", extended: true}));
app.use(cors());

app.use("/users", userRouter); //http://localhost:6100/users/signup
app.use("/tour", tourRouter); 

const MONGODB_URL = "mongodb+srv://parimalpriyanshu:7323952808@cluster0.6guiy6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 7100;
//mongodb+srv://parimalpriyanshu:<password>@cluster0.6guiy6m.mongodb.net/tourism app?retryWrites=true&w=majority&appName=Cluster0
 
mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port${port}`);
    })
}).catch((error)=>console.log(`${error} did not connect`));