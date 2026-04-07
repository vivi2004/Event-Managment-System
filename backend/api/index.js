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
// We will mock this temporarily if mongoose is not installed yet but since we will npm install, we keep it.
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Vercel Serverless Function entry point

export default app;
