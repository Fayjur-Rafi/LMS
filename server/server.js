import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import connectDB from './configs/mongodb.js';
import clerkWebhooks from './controllers/webhooks.js';
dotenv.config({});
const app=express();

const PORT=process.env.PORT || 5000;





//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsoptions={
  origin:'http://localhost:5173/',
  credentials:true
}

app.get("/",(req,res)=>{
  return res.status(200).json({
    message:"I'm comming from backend",
    success:true
  })
});

app.post("/clerk",express.json(),clerkWebhooks)



app.listen(PORT,()=>{
  connectDB();
  console.log(`Server is running on Port: ${PORT}`);
})



// lms_123
// lms12345
// lms12345
// mongodb+srv://lms_123:lms12345@cluster0.9tk053v.mongodb.net/