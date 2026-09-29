import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import statsRouter from './routes/stats.js';
import ticketsRouter from './routes/tickets.js';
import customersRouter from './routes/customers.js';
import chatRouter from './routes/chat.js';
import memoryRouter from './routes/memory.js';
import settingsRouter from './routes/settings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development
app.use(cors({
  origin: '*', // Allows access from any client during local dev/hackathon
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger for development transparency
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'MemoryDesk AI – Customer Support Agent',
    service: 'Backend API Service',
    timestamp: new Date().toISOString(),
    hindsightStatus: process.env.HINDSIGHT_API_KEY ? 'Configured' : 'Awaiting Credentials in .env'
  });
});

// API Routes
app.use('/api/stats', statsRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/memory', memoryRouter);
app.use('/api/settings', settingsRouter);

// 404 fallback handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MemoryDesk AI Server listening on port ${PORT}`);
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`🧠 Hindsight Status: ${process.env.HINDSIGHT_API_KEY ? 'Configured' : 'Standby / Unconfigured in .env'}`);
  console.log(`=======================================================`);
});
