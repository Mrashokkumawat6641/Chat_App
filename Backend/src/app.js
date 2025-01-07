import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Database Connection
db();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

export default app;
