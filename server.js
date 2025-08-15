const express = require('express');
const cors = require('cors');
const path = require('path');
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
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Direct login route for frontend compatibility
app.post('/api/login', login);

// All other API routes
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/specialities', specialityRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/auth/login',
      '/api/login',
      '/api/about-us',
      '/api/banners',
      '/api/services',
      '/api/specialities',
      '/api/testimonials',
      '/api/contact'
    ]
  });
});

// Test protected route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working perfectly!' });
});

// Start server
const startServer = async () => {
  try {
    console.log('🔄 Starting server...');
    
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
      console.log('✅ Backend is ready with all endpoints!');
      if (!isConnected) {
        console.log('⚠️ Database features will not work until MongoDB is connected');
        console.log('📝 Fix: Add 0.0.0.0/0 to MongoDB Atlas Network Access');
      }
      console.log('📋 Available endpoints:');
      console.log('   - /api/health (health check)');
      console.log('   - /api/test (test endpoint)');
      if (isConnected) {
        console.log('   - /api/login (direct login)');
        console.log('   - /api/auth/login (auth login)');
        console.log('   - /api/about-us');
        console.log('   - /api/banners');
        console.log('   - /api/services');
        console.log('   - /api/specialities');
        console.log('   - /api/testimonials');
        console.log('   - /api/contact');
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
