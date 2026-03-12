# Pokemon Full-stack Application

This project is an interview test for the Junior Full-stack Engineer position. It consists of a React/TypeScript frontend and a NestJS/PostgreSQL backend, containerized using Docker.

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite, Axios, React Router
- **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL, Swagger
- **Infrastructure:** Docker, Docker Compose

## 🚀 Prerequisites
Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## ⚙️ Environment Variables
The application uses the following environment variables (already pre-configured in `docker-compose.yml` for easy evaluation):

**Backend:**
- `POSTGRES_HOST`: db
- `POSTGRES_PORT`: 5432
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: mysecretpassword
- `POSTGRES_DATABASE`: pokemon_db
- `JWT_SECRET`: INTERVIEW_TEST_POKEMON_2026
- `FRONTEND_URL`: http://localhost:5173

**Frontend:**
- `VITE_API_URL`: http://localhost:3000

## 🏃‍♂️ How to Run the Application
You can start the entire application (Database, Backend, and Frontend) with a single command:

```bash
docker-compose up -d --build