import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/',(req,res)=>res.send("API is working"))

//morgan is a middleware that logs HTTP requests 
app.use(morgan('dev'));

app.use("/api/v1" , router)

export default app;