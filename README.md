# Simple Transactions API (REST API)

This project is part of my journey exploring Node.js and building efficient back-end solutions, and was built as part of my studies at Rocketseat. Transactions API is a simple REST API that enables users to record and manage transactions seamlessly.

## Features

- **Create Transactions**: Users can create transactions with a name, amount, and type (credit or debit).
- **Automatic Metadata**: Each transaction receives a unique UUID and a timestamp (`created_at`).
- **Transaction Types**: Transactions fall under two categories—income or outcome.
- **Retrieve Transactions**:
  - Fetch a list of all transactions associated with the user (via cookies).
  - Retrieve a single transaction using its unique ID.
  - Generate a summary displaying the user's balance.
- **Cookie-based User Recognition**: Instead of a login system, the API uses cookies to associate transactions with specific users.

## Technologies Used

- Node.js for building the back-end.
- TypeScript for strong typing and improved development experience.
- Fastify for high-performance request handling.
- Knex.js for structured database interactions, with support for multiple database systems.
- Zod for schema validation and data integrity.
- Vitest for reliable unit and integration testing.
- Supertest for API request testing.
- Cookies for sessionless user tracking.

## Testing
To ensure the reliability of the Transactions API, various tests were implemented using Vitest and Supertest. These tests cover essential functionalities, including:
- **Transaction Creation**: Verifies that transactions are successfully stored.
- **Listing Transactions**: Ensures users can retrieve all transactions linked to their session.
- **Fetching a Transaction by ID**: Confirms transactions can be accessed using their unique identifier.
- **Transaction Summary**: Validates the balance calculation based on income and outcome transactions.

## My Journey

This project was one of my learning challenges at Rocketseat and a valuable experience. My biggest challenge was working with cookies instead of authentication, but I overcame it and improved my understanding of state management, request handling, and data validation. Structuring transactions efficiently and maintaining user-specific data without traditional login made the API more seamless and intuitive.
