# Backend API for Register and Verify Data System

## Description

This project is a backend API that manages user registration, data verification, document uploads, and email notifications. The API interacts with a MongoDB database and allows CRUD operations on collections such as `registers`, `verifyData`, `uploadDocument`, and more.

## Technologies

- **Node.js**: Server runtime environment.
- **Express.js**: Framework for creating the web server.
- **MongoDB**: NoSQL database.
- **Multer**: Middleware for file handling.
- **Nodemailer**: Email sending.
- **dotenv**: Environment variable management.
- **Joi**: Data validation.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Anyel-ec/FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    ```

2. Install the dependencies:

    ```bash
    cd FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    npm install
    ```

3. Create a `.env` file in the project root with the following variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your_db
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_password
    ```

4. Start the server:

    ```bash
    npm start
    ```

The server will run on `http://localhost:3000`.

## Endpoints

### User Registration

- **GET /api/registers**: Get all records.
- **GET /api/registers/:id**: Get a record by its ID.
- **POST /api/registers**: Create a new record.
- **PUT /api/registers/:id**: Update a record by its ID.
- **DELETE /api/registers/:id**: Delete a record.

### Data Verification

- **GET /api/verifyData**: Get all verification data.
- **GET /api/verifyData/:id**: Get verification data by ID.
- **POST /api/verifyData**: Create new verification data.
- **PUT /api/verifyData/:id**: Update verification data by ID.
- **DELETE /api/verifyData/:id**: Delete verification data.

### Document Uploads

- **POST /api/uploadDocument/:id**: Upload a document associated with a verification record.
- **PUT /api/uploadDocument/:id**: Update an existing document.
- **GET /api/uploadDocument/:id**: Get a document by ID.

### Users

- **GET /api/users**: Get all users.
- **POST /api/users**: Create a new user.

## Project Structure

```
├── src
│   ├── config
│   │   ├── db.js             # MongoDB connection configuration
│   │   ├── environment.js    # Load environment variables
│   ├── routes
│   │   ├── registerRoutes.js # Routes related to registration
│   │   ├── verifyDataRoutes.js
│   │   ├── uploadDocumentRoutes.js
│   ├── collections
│   │   ├── Register.js       # Register model
│   │   ├── VerifyData.js     # Verification data model
│   └── services
│       └── emailService.js   # Service for email sending
├── .env                      # Environment variables
├── server.js                 # Main file to start the server
```

## Validations

The system validates user input, including:
- **Valid Ecuadorian ID**.
- **Phone number** (must start with 0 and be 10 digits).
- **Valid email**.
- The **name** must be between 3 and 100 characters.
- Must be at least 18 years old.
