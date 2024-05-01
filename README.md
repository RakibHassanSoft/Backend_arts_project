Arts REST API Documentation
This document provides an overview of the endpoints and functionalities available in the Arts REST API.

User Management
Create Account
Endpoint: POST /createUser
Description: Allows users to create a new account.
Request Body:
User_email: User's email address
username: User's username
password: User's password
Get User by ID
Endpoint: GET /user/:id
Description: Retrieves a user's data by ID.
Request Parameters:
id: User ID
Get User by Email
Endpoint: GET /userByEmail/:email
Description: Retrieves a user's data by email.
Request Parameters:
email: User email address
Category Management
Create Category
Endpoint: POST /createCategory
Description: Allows users to create a new category.
Request Body:
name: Category name
description: Category description
Get All Categories
Endpoint: GET /categories
Description: Retrieves a list of all categories.
Item Management
Add Item to Cart
Endpoint: POST /user/:id/addItem
Description: Adds an item to the user's cart.
Request Parameters:
id: User ID
Request Body:
Item details
Get User Cart
Endpoint: GET /user/:id/cart
Description: Retrieves the user's cart.
Request Parameters:
id: User ID
Arts Data Management
Create Item
Endpoint: POST /create
Description: Allows users to create a new item.
Request Body:
Item details
Get All Items
Endpoint: GET /arts
Description: Retrieves a list of all items.
Get Item Details
Endpoint: GET /arts/:id
Description: Retrieves details of a specific item.
Request Parameters:
id: Item ID
Update Item
Endpoint: PUT /arts/:id
Description: Updates details of a specific item.
Request Parameters:
id: Item ID
Request Body:
Updated item details
Delete Item
Endpoint: DELETE /arts/:id
Description: Deletes a specific item.
Request Parameters:
id: Item ID
