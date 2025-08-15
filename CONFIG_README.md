# 🎯 Centralized Configuration System

This project now uses a centralized configuration system that makes it easy to manage all settings in one place.

## 📁 Configuration Files

- **`config/config.js`** - Main configuration file
- **`config/db.js`** - Database configuration (uses main config)
- **`server.js`** - Server configuration (uses main config)

## 🔧 How to Use

### 1. **Import the Config**
```javascript
const config = require('./config/config');
```

### 2. **Get Full API URLs**
```javascript
// Get complete URL with base URL
const healthUrl = config.getFullUrl('/health');
// Result: https://music-backend-393l.onrender.com/api/health

const loginUrl = config.getFullUrl('/login');
// Result: https://music-backend-393l.onrender.com/api/login
```

### 3. **Get API Paths (without base URL)**
```javascript
// Get just the API path
const authPath = config.getApiUrl('/auth');
// Result: /api/auth

const aboutPath = config.getApiUrl('/about-us');
// Result: /api/about-us
```

### 4. **Environment Checks**
```javascript
if (config.isProduction()) {
  console.log('Running in production mode');
}

if (config.isDevelopment()) {
  console.log('Running in development mode');
}
```

### 5. **Access Configuration Values**
```javascript
// Server settings
const port = config.server.port;
const environment = config.server.nodeEnv;

// Database settings
const dbUri = config.database.uri;
const dbOptions = config.database.options;

// Upload settings
const maxFileSize = config.upload.maxSize;
const allowedTypes = config.upload.allowedTypes;

// JWT settings
const jwtSecret = config.jwt.secret;
const jwtExpiry = config.jwt.expiresIn;
```

## 🌍 Environment Variables

The configuration automatically reads from environment variables:

| Environment Variable | Config Path | Default Value |
|---------------------|-------------|---------------|
| `PORT` | `config.server.port` | `5000` |
| `NODE_ENV` | `config.server.nodeEnv` | `development` |
| `MONGODB_URI` | `config.database.uri` | Your MongoDB URI |
| `API_BASE_URL` | `config.api.baseUrl` | `https://music-backend-393l.onrender.com` |
| `JWT_SECRET` | `config.jwt.secret` | `your-secret-key-change-in-production` |
| `JWT_EXPIRES_IN` | `config.jwt.expiresIn` | `24h` |
| `CORS_ORIGIN` | `config.api.cors.origin` | `*` |

## 🚀 Benefits

1. **Single Source of Truth** - All configuration in one place
2. **Easy Updates** - Change URL/port once, updates everywhere
3. **Environment Aware** - Different settings for dev/prod
4. **Type Safe** - Consistent configuration structure
5. **Maintainable** - No more hardcoded values scattered throughout code

## 📝 Example Usage in Controllers

```javascript
// controllers/serviceController.js
const config = require('../config/config');

exports.getServices = async (req, res) => {
  try {
    // Use config for consistent API responses
    const services = await Service.find();
    res.json({
      success: true,
      data: services,
      apiUrl: config.api.baseUrl,
      endpoint: config.getFullUrl('/services')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      endpoint: config.getFullUrl('/services')
    });
  }
};
```

## 🔄 Updating Configuration

### Change API URL:
1. Update `config/config.js`:
   ```javascript
   baseUrl: process.env.API_BASE_URL || 'https://your-new-url.com'
   ```

2. Update `render.yaml`:
   ```yaml
   - key: API_BASE_URL
     value: https://your-new-url.com
   ```

3. Redeploy on Render

### Change Port:
1. Update `config/config.js`:
   ```javascript
   port: process.env.PORT || 3000
   ```

2. Update `render.yaml`:
   ```yaml
   - key: PORT
     value: 3000
   ```

## 📋 Available Configuration Sections

- **Server**: Port, environment, production checks
- **API**: Base URL, version, prefix, CORS settings
- **Database**: URI, connection options
- **JWT**: Secret, expiration time
- **Upload**: File size limits, allowed types, upload path
- **Logging**: Log levels, console/file output

## 🎉 Result

Now you can easily:
- ✅ Change your API URL in one place
- ✅ Switch between development/production
- ✅ Update database settings centrally
- ✅ Manage all configuration consistently
- ✅ No more hardcoded values throughout your code!
