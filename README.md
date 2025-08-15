# Music Backend

A complete backend for Music Admin with authentication, file uploads, and CRUD operations.

## Features

- User authentication with JWT
- File upload support
- CRUD operations for:
  - About Us
  - Banners
  - Services
  - Specialities
  - Testimonials
  - Contact submissions
- MongoDB integration
- RESTful API endpoints

## API Endpoints

- `POST /api/login` - User login
- `POST /api/auth/login` - Authentication login
- `GET /api/health` - Health check
- `GET /api/test` - Test endpoint
- Various CRUD endpoints for different entities

## Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Click "Apply" to deploy

### Option 2: Manual Deployment

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `music-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `mongodb+srv://nainaa5674:FuQMtPwl8QeBc2A9@cluster0.8wyof6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

7. Click "Create Web Service"

## Environment Variables

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (Render will set this automatically)
- `MONGODB_URI`: MongoDB connection string

## Local Development

```bash
cd backend
npm install
npm run dev
```

The server will start on `http://localhost:5000`

## Database

The application uses MongoDB Atlas. Make sure your IP address is whitelisted in MongoDB Atlas for local development.

## File Uploads

Uploaded files are stored in the `backend/uploads/` directory and served statically at `/uploads` endpoint.

## Security Notes

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- CORS is enabled for cross-origin requests
- File upload size is limited to 25MB
