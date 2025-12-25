import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import boardRoutes from './routes/boardRoutes.js';

import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRoutes);

// Database connection logic
const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;

        // If local MongoDB isn't detected or URI is default, use Memory Server for instant demo
        if (!mongoUri || mongoUri.includes('localhost')) {
            console.log('🚀 Local MongoDB not detected or using default. Starting In-Memory Database for instant experience...');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }

        await mongoose.connect(mongoUri);
        console.log('✅ Connected to Database:', mongoUri.startsWith('mongodb://127.0.0.1') ? 'In-Memory (Ephemeral)' : 'Remote');

        app.listen(PORT, () => {
            console.log(`📡 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1);
    }
};

connectDB();
