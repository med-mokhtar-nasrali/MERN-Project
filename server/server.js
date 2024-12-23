import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors'
import router from "./routes/recipes.routes.js"
dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json(),cors());  // Parse JSON requests

// Connect to the database
dbConnect();

// Routes
app.use('/api', authRoutes,router);  // Authentication routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})