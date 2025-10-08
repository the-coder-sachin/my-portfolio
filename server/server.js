import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import subscriberRouter from "./routes/subscriber.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/subscriber", subscriberRouter)

app.get("/", (req, res)=>{
    res.send("Hi Sachin")
});
 
const port = process.env.PORT || 5000;


app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
    connectDB()
})
