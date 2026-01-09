import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"

const app = express()
const PORT = process.env.PORT || 3000;
await connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req, res)=>{
    res.send("app is working");
})



app.use('/api/user',userRouter);


app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})