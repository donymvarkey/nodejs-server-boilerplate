# Node.js Boilerplate Code Documentation

## Overview

<p>This Node.js boilerplate provides a solid foundation for building scalable and maintainable Node.js applications. It includes configurations, structures, and tools to streamline development and ensure best practices.</p>

## Features

- Environment Management: Pre-configured .env file handling with dotenv.
- Linting and Formatting: Includes ESLint and Prettier for code quality and consistency.
- File Structure: A clean and modular directory layout.
- Logging: Integrated logging with Winston or similar tools.
- Error Handling: Centralized error handling for better debugging.
- Scripts: Useful npm scripts for development and production.
- API Framework: Ready-to-use Express.js setup.
- Swagger Docs: Built-in Swagger docs

## Directory Structure

```
project-root/
│
├── logs/ # Contains application logs
├── src/
│ ├── config/ # Configuration files
│ ├── controllers/ # Route controllers for all API endpoints
| ├── database/ # Database connection methods
│ ├── helpers/ # Helper functions and utilities
│ ├── logger/ # Custom Logger configurations
│ ├── middlewares/ # Custom Express middlewares
│ ├── models/ # Database models (e.g., Mongoose schemas)
│ ├── routes/ # API routes
│ ├── services/ # Business logic and services
│ └── Server.js # http server configurations
│
├── .env # Environment variables
├── .eslintrc.js # ESLint configuration
├── .prettierrc # Prettier configuration
├── .gitignore # Git ignore configuration
├── package.json # NPM configuration
├── index.js # Application entry point
└── README.md # Project documentation
```

## Scripts

- Run in production mode
  ```bash
  $ npm start
  ```
- Run in development mode
  ```bash
  $ npm run dev
  ```
- Check linting issues
  ```bash
  $ npm run lint
  ```
- Fix linting issues
  ```bash
  $ npm run lint:fix
  ```
- Format code
  ```bash
  $ npm run format
  ```

## Configuration

|  Variable   |               Description                |        Default Value        |
| :---------: | :--------------------------------------: | :-------------------------: |
|   `PORT`    |       Port to run the application        |           `5000`            |
| `MONGO_URL` |        Database Connection String        | `mongodb://localhost:27017` |
| `SIGNATURE` | Hashed secret key for signing JWT tokens |             nil             |

## Contribution

1. Fork the repository and clone it to your local machine.
2. Create a new branch.
   ```
   $ git checkout -b feat/your-feature-name
   ```
3. Commit your changes to the branch.
   ```
   $ git commit -m "your commit message"
   ```
4. Push your changes to your branch.
   ```
   $ git push origin feat/your-feature-name
   ```
5. Open a Pull Request.

## Acknowledgements

This boilerplate was inspired by the need to simplify the initial setup for Node.js projects and promote best practices.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
