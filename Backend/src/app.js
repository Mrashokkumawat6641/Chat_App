import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from "cookie-parser";
// import {corsMiddleware} from './middleware/cors.middleware.js';

dotenv.config();

const app = express();



// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allows cookies and authentication headers
}));

app.options('*', cors());

app.use(express.json() );
app.use(cookieParser());

// Database Connection
db();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);





export default app;
