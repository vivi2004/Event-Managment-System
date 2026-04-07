/**
 * EVENT MANAGEMENT SYSTEM BACKEND
 * 
 * Flow Diagram Reference:
 * (See FLOW_DIAGRAM.md for visual Mermaid chart)
 * 
 * PATH: START -> INDEX -> LOGIN -> [VENDOR / ADMIN / USER]
 * 
 * ADMIN: Maintenance Menu -> Memberships, User/Vendor Management
 * VENDOR: Product Management (Insert/Delete), User Requests
 * USER: View Vendors, Cart (Payment/Total/Cancel), Order Status check
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL, 'http://localhost:5175', 'http://localhost:3000']
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Event Management System API is running',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
