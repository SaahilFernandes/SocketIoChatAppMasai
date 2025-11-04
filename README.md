# Real-time Chat Application using React and Socket.io
This is a full-stack, real-time chat application built with React on the frontend and a Node.js, Express, and Socket.io backend. The focus of this project is to demonstrate real-time, bi-directional communication between clients and a server, with all chat data and user information being stored in-memory.

## Features

-   **Room-Based Chatting:** Users can join specific chat rooms by entering a username and a room name. If no room is specified, they join a default 'Public' room.
-   **Real-time Messaging:** Messages are sent and received instantly across all users in the same room without needing to refresh the page.
-   **Online User List:** A sidebar displays a list of all users who are currently active in the same room.
-   **Current User Highlighting:** The list of online users and messages sent by the current user are visually distinct for a better user experience.
-   **Admin Notifications:** Automated system messages from an "Admin" bot announce when a user joins or leaves a room.
-   **Simple & Clean UI:** The interface is designed to be intuitive and easy to use.
-   **Admin Broadcast (Extra Credit):** A feature is implemented on the backend to allow an admin to send a broadcast message to all connected rooms simultaneously.

## Tech Stack

### Backend

-   **Node.js:** JavaScript runtime for the server.
-   **Express:** A minimalist web framework for Node.js, used to serve the application.
-   **Socket.io:** Enables real-time, event-based communication.
-   **CORS:** Middleware to handle Cross-Origin Resource Sharing.

### Frontend

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast and modern frontend build tool.
-   **Socket.io Client:** The client-side library to connect to the Socket.io server.
-   **React Router DOM:** For handling client-side routing between the Join and Chat pages.

## Project Structure
real-time-chat-app/
├── backend/
│ ├── node_modules/
│ ├── package.json
│ └── server.js
└── frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── Chat.jsx
│ │ └── Join.jsx
│ ├── App.css
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js

## Setup and Installation

To get this project running on your local machine, please follow these steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 16 or later recommended)
-   npm (comes with Node.js)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd real-time-chat-app
    ```

3.  **Setup the Backend:**
    -   Navigate to the backend folder and install the required dependencies.
    ```bash
    cd backend
    npm install
    ```

4.  **Setup the Frontend:**
    -   From the project root, navigate to the frontend folder and install its dependencies.
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application-
<img width="788" height="920" alt="image" src="https://github.com/user-attachments/assets/1ebf3fa0-20c9-4456-9056-7c666ad59bc4" />

<img width="786" height="928" alt="image" src="https://github.com/user-attachments/assets/6c60c64b-a446-46fe-8ac2-540fa88e5518" />

You will need to run the backend and frontend servers in two separate terminals.

### Terminal 1: Start the Backend Server

-   Navigate to the `backend` directory and run the server.

```bash
cd backend
node server.js





