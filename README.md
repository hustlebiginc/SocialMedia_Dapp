# Social Media DApp

## Overview

This is a decentralized social media application built on the Ethereum blockchain using Solidity for the smart contract and React for the frontend. Users can register, create posts, and like posts. The contract rewards authors with tokens for likes received on their posts.

## Features

- User registration
- Post creation
- Like posts
- Token rewards for authors

## Technologies Used

- Solidity
- React
- ethers.js
- MetaMask

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MetaMask extension for your browser


## Smart Contract

### SocialMedia.sol

Defines the smart contract for the Social Media DApp.

- **Structs:**
  - `User`: Stores user address, username, and balance
  - `Post`: Stores post ID, author address, content, likes, and timestamp
- **Mappings:**
  - `users`: Maps user addresses to `User` structs
  - `posts`: Maps post IDs to `Post` structs
  - `likes`: Maps post IDs and user addresses to a boolean indicating if the user has liked the post
- **Functions:**
  - `register`: Registers a new user
  - `createPost`: Creates a new post
  - `likePost`: Likes a post and rewards the author
  - `getPost`: Retrieves a post by ID
  - `getUserBalance`: Retrieves the token balance of a user

## Frontend

### MetaMaskProvider.js

Provides the MetaMask context to the application.

- **State Variables:**
  - `provider`: Stores the MetaMask provider
  - `account`: Stores the connected MetaMask account
- **useEffect Hook:**
  - Connects to MetaMask and sets the provider and account

### App.js

Main component of the Social Media DApp.

- **State Variables:**
  - `contract`: Stores the smart contract instance
  - `balance`: Stores the user's token balance
  - `posts`: Stores the list of posts
  - `newPostContent`: Stores the content of a new post
  - `username`: Stores the username input by the user
  - `error`: Stores any error messages
  - `registered`: Indicates whether the user is registered
- **Functions:**
  - `initContract`: Initializes the contract and fetches user data and posts
  - `handleRegister`: Handles user registration
  - `handleCreatePost`: Handles post creation
  - `handleLikePost`: Handles liking a post
- **useEffect Hook:**
  - Initializes the contract and fetches user data and posts when the provider and account are available

## Styles

### App.css

Defines the styles for the App component.

- `.app`: Sets the font and padding for the main app container
- `h1`: Centers the main heading
- `.error`: Styles error messages with red color and center alignment
- `.register`, `.create-post`: Centers and adds margin to the registration and post creation sections
- `.register input`, `.create-post textarea`: Styles input and textarea elements
- `.register button`, `.create-post button`: Styles buttons
- `.posts`: Adds margin to the posts section
- `.post`: Styles individual posts
- `.post p`: Adds margin to paragraphs within posts
- `.post button`: Styles the like button within posts

## Installation

1. Clone the repository
2. Install dependencies
```bash
    npm install
```

3. Compile the smart contract
   ```bash
   npx hardhat compile
   ```
4. Deploy the smart contract
  ```bash
npx hardhat run scripts/deploy.js --network localhost
  ```
- Note: Adjust the localhost network configuration in hardhat.config.js as needed
5. Run the React application
  - Navigate to the frontend directory:
```bash
cd client
```
  - Start the React application:
```bash
npm start
```
- This will start the development server. Open http://localhost:3000 to view it in the browser.
### License
- This project is licensed under the MIT License 

