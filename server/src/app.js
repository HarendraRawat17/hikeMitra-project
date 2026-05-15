import express, { urlencoded } from "express"; 
import cors from "cors" ;
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({limit: "15kb"}));
app.use(express.urlencoded({extended: true, limit: "15kb"}));
app.use(express.static("public")) // general config to store pdf, img files locally in server
app.use(cookieParser());


import userRouter from "./Routes/user.route.js"
app.use('/api/v1/user', userRouter)
 
export {app};