// Example: How to use the centralized configuration in your project

const config = require('../config/config');

// Example 1: Get full API URLs
console.log('Full API URLs:');
console.log('Health Check:', config.getFullUrl('/health'));
console.log('Login:', config.getFullUrl('/login'));
console.log('Services:', config.getFullUrl('/services'));

// Example 2: Get API paths (without base URL)
console.log('\nAPI Paths:');
console.log('Auth:', config.getApiUrl('/auth'));
console.log('About Us:', config.getApiUrl('/about-us'));

// Example 3: Check environment
console.log('\nEnvironment Info:');
console.log('Is Production:', config.isProduction());
console.log('Is Development:', config.isDevelopment());
console.log('Node Environment:', config.server.nodeEnv);

// Example 4: Database configuration
console.log('\nDatabase Config:');
console.log('URI:', config.database.uri);
console.log('Options:', config.database.options);

// Example 5: Upload configuration
console.log('\nUpload Config:');
console.log('Max Size:', config.upload.maxSize);
console.log('Allowed Types:', config.upload.allowedTypes);
console.log('Upload Path:', config.upload.uploadPath);

// Example 6: JWT configuration
console.log('\nJWT Config:');
console.log('Secret:', config.jwt.secret);
console.log('Expires In:', config.jwt.expiresIn);

// Example 7: CORS configuration
console.log('\nCORS Config:');
console.log('Origin:', config.api.cors.origin);
console.log('Credentials:', config.api.cors.credentials);

// Example 8: Server configuration
console.log('\nServer Config:');
console.log('Port:', config.server.port);
console.log('Base URL:', config.api.baseUrl);
console.log('API Prefix:', config.api.prefix);
