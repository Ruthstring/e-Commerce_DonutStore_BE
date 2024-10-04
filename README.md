# E-commerce Backend

## Description
This is the backend API for an e-commerce platform. It provides endpoints for user authentication, product management, shopping cart, and recommendations. The backend is built with Node.js, Express, and MongoDB for a scalable and flexible application architecture.

## Features:
- **User Authentication**: Secure signup, login, and logout using JWT tokens.
- **Product Management**: API for product listing, categories, and detailed product information.
- **Shopping Cart API**: Supports adding, removing, and updating items in a user's cart, with persistence using MongoDB.
- **Recommendations**: Provide product recommendations based on the items in the user's cart.
- **MongoDB NoSQL Database**: Efficient storage and querying of data.

## Technologies:
- **Node.js**: JavaScript runtime environment.
- **Express**: Minimal web framework used for building REST APIs.
- **MongoDB**: NoSQL database used for storing product, user, and cart data.
- **JWT**: For authentication and session management.
- **CSV Support**: Enable upload data to the database from an Excel though CSV FILES. 

## Future Enhancements:
- **Payment Gateway**: Integrate Stripe or a mock payment API for processing user payments.
- **Order History**: Allow users to view and track past orders.
- **Stripe**: Payment processing for order completion.
