import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const serverData = express();

import authRoutes from './routes/authRoutes.js';

serverData.use(express.json()); 

serverData.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

serverData.use('/api/users', authRoutes);

serverData.listen(8080, () => {
    console.log(`Running server on 8080.`)
});