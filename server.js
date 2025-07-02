const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const userRoutes = require('./Routes/user.route');
const authRoutes = require('./Routes/auth.route');

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  })
);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Express + Sequelize + PostgreSQL" });
});

db.sequelize.authenticate().then(() => {
  console.log('DB connected ✅');
}).catch((err) => {
  console.error('DB connection failed ❌:', err);
});


// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({
    port:10080,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});


// Set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;