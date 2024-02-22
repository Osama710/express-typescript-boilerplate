# Express Typescript Boilerplate with Authentication and CRUD Operations

Welcome to the Express Typescript Boilerplate project! This boilerplate provides a solid foundation for building web applications using Express ts, with built-in authentication, schema validation middlewares, and CRUD operations for managing users.

## Features

- **Authentication**: User authentication using JSON Web Tokens (JWT) for secure access to protected routes.
- **Schema Validation**: Middleware for validating request payloads against predefined schemas using Yup.
- **User CRUD Operations**: Complete CRUD operations for managing users, including creation, retrieval, updating, and deletion.
- **Login Endpoint**: Secure login endpoint for authenticating users and generating JWT tokens for subsequent requests.
- **Database Migration**: Utilize the `/migrate` API endpoint to automatically create SQL tables. Ensure you manually create a database with the name `express_boilerplate` before running the migration.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Node.js and npm
- MySQL (with a database named `typescript_express`)
- Git (optional)

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-typescript-boilerplate.git

2. Navigate to the project directory:

   ```bash
   cd express-typescript-boilerplate

3. Install dependencies:

   ```bash
   npm install

4. Create a .env file based on the provided .env.example and configure your environment variables, including database credentials and JWT secret key.

5. create a database typescript_express and then run api /migrate to create tables.

6. Start the server:
   ```bash
   nodemon

## API Documentation

Explore the API endpoints and their functionalities:

- **POST /user**: Register a new user.
- **POST /login**: Authenticate user and generate JWT token.
- **GET /users**: Get all users.
- **GET /user/:id**: Get user by ID.
- **PUT /user/:id**: Update user by ID.
- **DELETE /user/:id**: Delete user by ID.
- **POST /migrate**: Run database migration to create tables.

For detailed information on each endpoint, refer to the API documentation or inspect the codebase.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.
