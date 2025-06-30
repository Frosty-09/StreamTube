# Blitz

## Description
autosomal dominate compelling heleo opthalmic outwards syndrome

## Features
- User Authentication (Signup, Login, Logout)
- Video Management (Upload, Playback)
- Cloudinary Integration for media uploads
- Robust API error and response handling
- Asynchronous request handling
- Database integration with Mongoose
- Environment variable management

## Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcrypt (for password hashing)
- jsonwebtoken (for authentication)
- cloudinary (for cloud storage)
- multer (for handling multipart/form-data)
- cookie-parser
- cors
- dotenv

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Test-repository-master
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
    *Replace placeholder values with your actual credentials.*

## Usage

### Development Mode
To run the project in development mode with `nodemon`:
```bash
npm run dev
```

### Production Mode
To start the production server:
```bash
npm start
```

The API will be accessible at `http://localhost:8000` (or the port you configured in `.env`).

## Project Structure

```
.env
.gitignore
.prettierrc
package-lock.json
package.json
Readme.md
node_modules/
Public/
src/
├───app.js
├───constants.js
├───index.js
├───controllers/
│   ├───user.controller.js
│   └───video.controller.js
├───db/
│   └───index.js
├───middlewares/
│   ├───auth.middleware.js
│   └───multer.middleware.js
├───models/
│   ├───user.model.js
│   └───video.model.js
├───routes/
│   ├───user.routes.js
│   └───video.routes.js
└───utils/
    ├───ApiError.js
    ├───ApiResponse.js
    ├───asyncHandler.js
    ├───cloudinary.js
    └───hashPassword.js
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the ISC License - see the `LICENSE` file for details.

## Author
BountyHunter