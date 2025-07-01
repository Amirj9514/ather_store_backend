import cors from "cors";
import express from "express";
import { createServer } from "http";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const db = require('../models');
const server = createServer(app);
const userRoutes = require('./routes/user.routes');

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  })
);


app.use(express.json());
app.use('/api', userRoutes);


db.sequelize.authenticate().then(() => {
  console.log('DB connected ✅');
}).catch((err:any) => {
  console.error('DB connection failed ❌:', err);
});

// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({
    port: process.env.DATABASE_URL || 3001,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});



// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
