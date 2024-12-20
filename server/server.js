import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from './config/recipes.connection.js';

dotenv.config();

const app = express();

dbConnect();

app.use(express.json(), cors());

const PORT = process.env.PORT;


app.listen( PORT, () => console.log(`Listening on PORT: ${PORT}`) );