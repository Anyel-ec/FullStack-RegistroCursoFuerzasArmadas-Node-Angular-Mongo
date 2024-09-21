# Backend NodeJS Express MongoDB

This is a backend project for an advanced programming system, using Node.js, Express, and MongoDB. The project includes various routes and controllers to handle user registrations, authentication, document uploads, and data verification.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Usage Examples](#usage-examples)
- [Contribution](#contribution)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Anyel-ec/Backend-NodeJS-RestAPI-Advanced-Programming.git
    cd Backend-NodeJS-RestAPI-Advanced-Programming
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project with the following configuration:

    ```env
    PORT=3000
    MONGO_URI=your_mongodb_uri
    SECRET_KEY=your_secret_key
    ```

## Configuration

The project uses a custom environment variable loader and connects to a MongoDB database. Make sure to properly configure your `.env` file with the necessary variables.

## Project Structure

```
├── src
│   ├── config
│   │   ├── db.js
│   │   └── environment.js
│   ├── controller
│   │   ├── loadDataController.js
│   │   ├── registerController.js
│   │   ├── sendEmailController.js
│   │   ├── uploadDocumentController.js
│   │   ├── userController.js
│   │   ├── verifyDataController.js
│   │   └── verifyDocumentsController.js
│   ├── middleware
│   │   └── registerMiddleware.js
│   ├── routes
│   │   ├── registerRoutes.js
│   │   ├── verifyDataRoutes.js
│   │   ├── loadDataRoutes.js
│   │   ├── verifyDocumentRoutes.js
│   │   ├── uploadDocumentRoutes.js
│   │   └── userRoute.js
│   └── utils
│       └── validateEcuadorianID.js
├── .env
├── package.json
└── index.js
```

## Routes

### User Registration

- `GET /api/registers` - Get all registrations
- `GET /api/registers/:id` - Get a registration by ID
- `GET /api/registers/identification/:identification` - Get a registration by identification
- `POST /api/registers` - Create or update a registration
- `PUT /api/registers/:id` - Update a registration by ID
- `PUT /api/registers/identification/:identification` - Update a registration by identification
- `DELETE /api/registers/:id` - Delete a registration

### User Authentication

- `POST /api/users/register` - Create a new user
- `POST /api/users/login` - Authenticate a user

### Data Verification

- `GET /api/verifyData` - Get all verification records
- `GET /api/verifyData/relations` - Get verification records with related data
- `PUT /api/verifyData/:id` - Update a verification record
- `DELETE /api/verifyData/:id` - Delete a verification record

### Document Uploads

- `PUT /api/uploadDocument/:id` - Update document verification

### Other Endpoints

- `GET /api/load/gender` - Get genders
- `GET /api/load/province` - Get provinces
- `GET /api/load/command` - Get command types

## Usage Examples

### Encryption and Decryption

In the frontend, data is encrypted using `CryptoJS` before being sent to the server:

```javascript
import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key';
const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
```

In the backend, data is decrypted using the same secret key:

```javascript
const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY;

function decrypt(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

// Example of decryption in a route
app.post('/login', (req, res) => {
    const encryptedUser = req.body.user;
    const encryptedPassword = req.body.password;

    const user = decrypt(encryptedUser);
    const password = decrypt(encryptedPassword);

    console.log('Decrypted User:', user);
    console.log('Decrypted Password:', password);

    // Authentication logic...
});
```

## Contribution

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Create a Pull Request.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
