const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    const MONGODB_URI = 'mongodb+srv://nainaa5674:FuQMtPwl8QeBc2A9@cluster0.8wyof6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('🔄 MongoDB URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
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
