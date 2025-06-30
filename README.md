# Video Streaming App

This is a full-stack video streaming application. It includes a Node.js backend with Express.js and MongoDB, and a React Native frontend.

## Features

- User authentication (registration, login)
- Video upload and management
- Watch history

## Installation

### Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_uri
   CORS_ORIGIN=http://localhost:3000
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the `Frontend/StreamTube` directory:
   ```bash
   cd Frontend/StreamTube
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Multer
- Cloudinary
- bcrypt

### Frontend

- React Native
- Expo

## API Routes

- **Users:** `/api/v1/users`
- **Videos:** `/api/v1/videos`
