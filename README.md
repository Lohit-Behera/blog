# Blog Platform

A full-stack blogging platform that allows users to register, log in, create blogs, and view blog posts. The project uses React.js for the frontend, Express.js for the backend, and MongoDB for the database.

## Features

### Frontend

- **Routing**: Implements route protection and a structured layout using `react-router-dom`.
- **Authentication**: Supports signup, login, and token expiration handling.
- **Blog Features**: Users can create, view, and interact with blogs.
- **Theming**: Supports a dark mode using a custom theme provider.
- **Notifications**: Integrated notification system using `sonner`.

### Backend

- **User Authentication**: JWT-based authentication with hashed passwords and refresh tokens.
- **Blog Management**: RESTful API for blog creation, retrieval, and listing.
- **Middleware**: Protects routes with authentication middleware.
- **Pagination**: Supports paginated responses for blog listings.

## Technologies Used

### Frontend

- **React.js**
- **React Router**
- **Tailwind CSS**
- **Sonner for Notifications**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Others

- **Docker** (for deployment)
- **Vite** (for React development)

## API Endpoints

| Endpoint               | Method | Description               | Authentication |
| ---------------------- | ------ | ------------------------- | -------------- |
| /api/v1/users/register | POST   | Register a new user       | No             |
| /api/v1/users/login    | POST   | Log in a user             | No             |
| /api/v1/users/logout   | GET    | Log out the user          | Yes            |
| /api/v1/users/details  | GET    | Fetch user details        | Yes            |
| /api/v1/blogs/create   | POST   | Create a new blog         | Yes            |
| /api/v1/blogs/get/:id  | GET    | Fetch a single blog by ID | Yes            |
| /api/v1/blogs/all      | GET    | Fetch all blogs           | Yes            |

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- MongoDB
- npm or yarn package manager
- Docker (optional)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. If you are using Docker, you can change .env.sample to .env.

In backend Folder

`PORT`
`CORS_ORIGIN`
`MONGODB_URI`
`ACCESS_TOKEN_SECRET`
`ACCESS_TOKEN_EXPIRY`
`REFRESH_TOKEN_SECRET`
`REFRESH_TOKEN_EXPIRY`

In frontend Folder

`VITE_BASE_URL`

## Run Locally

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/blog.git
  cd blog
```

Change .env.sample to .env in both backend and frontend

**Running using [Docker](https://www.docker.com/)**

in root directory

```bash
  docker compose up
```

Then go to [localhost:5173](http://localhost:5173/) for frontend and [localhost:8000](http://localhost:8000/) for backend

**Running without Docker**

Change .env.sample to .env in both backend and frontend and add mongodb uri to the .env file in backend.

change directory to backend

```bash
  cd backend
```

Install node modules

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Then go to [http://localhost:8000](http://localhost:8000)

In another terminal for React js

Now change directory to frontend

```bash
  cd blog
  cd frontend
```

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Then go to [http://localhost:5173](http://localhost:5173)
