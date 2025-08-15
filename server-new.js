require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import configurations and utilities
const { connectDB } = require('./config/database');
const { createDefaultAdmin } = require('./controllers/authController');
const logger = require('./utils/logger');
const { PORT } = require('./utils/constants');

// Import routes
const authRoutes = require('./routers/authRoutes');
const aboutUsRoutes = require('./routers/aboutUsRoutes');
const bannerRoutes = require('./routers/bannerRoutes');
const specialityRoutes = require('./routers/specialityRoutes');
const serviceRoutes = require('./routers/serviceRoutes');
const testimonialRoutes = require('./routers/testimonialRoutes');
const contactRoutes = require('./routers/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to database
connectDB()
  .then(() => {
    logger.info('Database connected successfully');
    createDefaultAdmin();
  })
  .catch((err) => {
    logger.error('Database connection failed', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/specialities', specialityRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});
