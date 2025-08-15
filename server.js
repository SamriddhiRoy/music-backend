const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const connectDB = require('./config/db');
const { createDefaultAdmin, login } = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');

// Import all other routes
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const specialityRoutes = require('./routes/specialityRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors(config.api.cors));
app.use(express.json({ limit: config.upload.maxSize }));
app.use(express.urlencoded({ extended: true, limit: config.upload.maxSize }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, config.upload.uploadPath)));

// Routes
app.use(config.getApiUrl('/auth'), authRoutes);

// Direct login route for frontend compatibility
app.post(config.getApiUrl('/login'), login);

// All other API routes
app.use(config.getApiUrl('/about-us'), aboutUsRoutes);
app.use(config.getApiUrl('/banners'), bannerRoutes);
app.use(config.getApiUrl('/services'), serviceRoutes);
app.use(config.getApiUrl('/specialities'), specialityRoutes);
app.use(config.getApiUrl('/testimonials'), testimonialRoutes);
app.use(config.getApiUrl('/contact'), contactRoutes);

// Health check
app.get(config.getApiUrl('/health'), (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    baseUrl: config.api.baseUrl,
    endpoints: [
      config.getApiUrl('/auth/login'),
      config.getApiUrl('/login'),
      config.getApiUrl('/about-us'),
      config.getApiUrl('/banners'),
      config.getApiUrl('/services'),
      config.getApiUrl('/specialities'),
      config.getApiUrl('/testimonials'),
      config.getApiUrl('/contact')
    ]
  });
});

// Test protected route
app.get(config.getApiUrl('/test'), (req, res) => {
  res.json({ 
    message: 'Backend is working perfectly!',
    apiUrl: config.api.baseUrl,
    environment: config.server.nodeEnv
  });
});

// Start server
const startServer = async () => {
  try {
    console.log('🔄 Starting server...');
    console.log(`🌍 Environment: ${config.server.nodeEnv}`);
    console.log(`🔗 API Base URL: ${config.api.baseUrl}`);
    
    // Connect to database with retry logic
    console.log('🔄 Connecting to MongoDB...');
    let isConnected = false;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (!isConnected && retryCount < maxRetries) {
      try {
        isConnected = await connectDB();
        if (!isConnected) {
          retryCount++;
          console.log(`❌ Failed to connect to database. Retry ${retryCount}/${maxRetries}`);
          if (retryCount < maxRetries) {
            console.log('🔄 Waiting 5 seconds before retry...');
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      } catch (error) {
        retryCount++;
        console.error(`❌ Connection attempt ${retryCount} failed:`, error.message);
        if (retryCount < maxRetries) {
          console.log('🔄 Waiting 5 seconds before retry...');
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    }
    
    if (!isConnected) {
      console.log('❌ Failed to connect to database after all retries');
      console.log('⚠️ Starting server without database connection...');
      console.log('📝 To fix: Whitelist IP addresses in MongoDB Atlas Network Access');
      // Continue without database for now
    }

    // Create default admin user (only if connected)
    if (isConnected) {
      console.log('🔄 Creating default admin user...');
      try {
        await createDefaultAdmin();
      } catch (error) {
        console.error('⚠️ Failed to create default admin user:', error.message);
      }
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Live at: ${config.api.baseUrl}`);
      console.log('✅ Backend is ready with all endpoints!');
      if (!isConnected) {
        console.log('⚠️ Database features will not work until MongoDB is connected');
        console.log('📝 Fix: Add 0.0.0.0/0 to MongoDB Atlas Network Access');
      }
      console.log('📋 Available endpoints:');
      console.log(`   - ${config.getFullUrl('/health')} (health check)`);
      console.log(`   - ${config.getFullUrl('/test')} (test endpoint)`);
      if (isConnected) {
        console.log(`   - ${config.getFullUrl('/login')} (direct login)`);
        console.log(`   - ${config.getFullUrl('/auth/login')} (auth login)`);
        console.log(`   - ${config.getFullUrl('/about-us')}`);
        console.log(`   - ${config.getFullUrl('/banners')}`);
        console.log(`   - ${config.getFullUrl('/services')}`);
        console.log(`   - ${config.getFullUrl('/specialities')}`);
        console.log(`   - ${config.getFullUrl('/testimonials')}`);
        console.log(`   - ${config.getFullUrl('/contact')}`);
      }
    });

  } catch (error) {
    console.error('❌ CRITICAL ERROR during server startup:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', error);
    process.exit(1);
  }
};

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('❌ UNCAUGHT EXCEPTION:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
