import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from './config/recipes.connection.js';
import router from "./routes/recipes.routes.js"

dotenv.config();

const app = express();

dbConnect();

app.use(express.json(), cors());

app.use("/api", router);

const PORT = process.env.PORT;


app.listen( PORT, () => console.log(`Listening on PORT: ${PORT}`) );