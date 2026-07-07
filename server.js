const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");     //routes path
const openAIRoutes=require("./routes/openAIRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

//mongoose connection (placed after dotenv config bcz it uses env variables)
connectDB();

const app=express();    //rest object

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));     //*
app.use(cookieParser());
app.use(morgan("dev"));

const PORT=process.env.PORT || 8080 ;    //agar nhi mila

//API routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/openai' , openAIRoutes);


//ERROR HANDLING Middleware (routes ke baad lgta h)
app.use(errorHandler);      

app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
});