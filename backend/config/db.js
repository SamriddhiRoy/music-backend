const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nainaa5674:FuQMtPwl8QeBc2A9@cluster0.8wyof6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('🔄 MongoDB URI:', MONGODB_URI);
    
    // Add connection options with timeouts
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      retryWrites: true,
      w: 'majority'
    };
    
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ MongoDB Connected Successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error Details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    return false;
  }
};

module.exports = connectDB;
