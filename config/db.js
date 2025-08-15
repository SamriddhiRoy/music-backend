const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    const MONGODB_URI = config.database.uri;
    
    console.log('🔄 MongoDB URI:', MONGODB_URI);
    
    // Use connection options from config
    await mongoose.connect(MONGODB_URI, config.database.options);
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
