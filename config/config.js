const config = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production'
  },

  // API Configuration
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://music-backend-393l.onrender.com',
    version: 'v1',
    prefix: '/api',
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }
  },

  // Database Configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://nainaa5674:FuQMtPwl8QeBc2A9@cluster0.8wyof6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    options: {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      retryWrites: true,
      w: 'majority'
    }
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // File Upload Configuration
  upload: {
    maxSize: 25 * 1024 * 1024, // 25MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadPath: 'uploads/'
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableConsole: true,
    enableFile: false
  }
};

// Helper functions
config.getFullUrl = (endpoint = '') => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${config.api.baseUrl}${config.api.prefix}${cleanEndpoint}`;
};

config.getApiUrl = (endpoint = '') => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${config.api.prefix}${cleanEndpoint}`;
};

config.isDevelopment = () => config.server.nodeEnv === 'development';
config.isProduction = () => config.server.nodeEnv === 'production';

module.exports = config;
