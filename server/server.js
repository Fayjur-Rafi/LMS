// import express, { urlencoded } from 'express'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import dotenv from "dotenv";
// import connectDB from './configs/mongodb.js';
// import clerkWebhooks from './controllers/webhooks.js';

// dotenv.config({});

// const app = express();
// const PORT = process.env.PORT || 3000; // 5000 থেকে 3000 করুন

// // CORS - এটা সবার আগে
// const corsOptions = {
//   origin: 'http://localhost:5173', // শেষের '/' সরিয়ে দিন
//   credentials: true
// }
// app.use(cors(corsOptions));

// // Webhook route - MUST be BEFORE express.json()
// app.post("/api/webhooks/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// // Regular middlewares - webhook route এর পরে
// app.use(express.json());
// app.use(cookieParser());
// app.use(urlencoded({ extended: true }));

// // Test route
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "I'm coming from backend",
//     success: true
//   })
// });

// // MongoDB connection এবং server start
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on Port: ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });



// // import express, { urlencoded } from 'express'
// // import cors from 'cors'
// // import cookieParser from 'cookie-parser'
// // import dotenv from "dotenv";
// // import connectDB from './configs/mongodb.js';
// // import clerkWebhooks from './controllers/webhooks.js';
// // dotenv.config({});
// // const app=express();

// // const PORT=process.env.PORT || 5000;





// // //middlewares

// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(urlencoded({extended:true}));
// // const corsoptions={
// //   origin:'http://localhost:5173/',
// //   credentials:true
// // }

// // app.get("/",(req,res)=>{
// //   return res.status(200).json({
// //     message:"I'm comming from backend",
// //     success:true
// //   })
// // });

// // app.post("/clerk",express.json(),clerkWebhooks)



// // app.listen(PORT,()=>{
// //   connectDB();
// //   console.log(`Server is running on Port: ${PORT}`);
// // })



// // // lms_123
// // // lms12345
// // // lms12345
// // // mongodb+srv://lms_123:lms12345@cluster0.9tk053v.mongodb.net/

import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import connectDB from './configs/mongodb.js';
import clerkWebhooks from './controllers/webhooks.js'; // নিশ্চিত করুন path ঠিক আছে

dotenv.config({});

const app = express();
const PORT = 4000;

// CORS (first)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Clerk webhook route (raw body গ্রহণ)
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const payload = JSON.parse(req.body.toString()); // Buffer → JSON convert
    console.log("🔔 Webhook hit!");
    console.log("Event Type:", payload.type);
    console.log("Data ID:", payload.data?.id);
    await clerkWebhooks(payload, res); // JSON পাঠানো হচ্ছে
  } catch (err) {
    console.error("Webhook parse error:", err.message);
    res.status(400).send("Invalid webhook payload");
  }
});

// Other middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running", success: true });
});

// DB connect → server start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection failed:", err));
