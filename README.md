# Camlin Group Vue 3 Vite App

This is a Vue 3 app built with Vite and TypeScript and Pinia for state management. This app is containerized using Docker and served with Nginx in production.

## Prerequisites

To build and run this application using Docker, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop) (Install Docker Desktop for Windows/macOS, or Docker CLI for Linux)

## Cloning the Repository

To get started, clone this repository:

```bash
git clone https://github.com/barrycorrigan/camlin-app
cd camlin-app
```

## Building the Docker Image

After cloning the repo, you can build the Docker image by running the following command in the root of the project directory

```bash
docker build -t camlin-app .
```

## Running the Docker Container

Once the Docker image is successfully built, you can run the app in a Docker container with the following command:

```bash
docker run -d -p 8080:80 camlin-app
```

Then you should be able to access the app via this URL [http://localhost:8080](http://localhost:8080)


## Local Developement without Docker

If you want to run the project locally without Docker, please follow these steps:

1. Install dependencies

```bash
npm install
```

2. Run the vite development server

```bash
npm run dev
```

## Build for Production

If you're building the app locally (without Docker), you can build the app with:

```bash
npm run build
```

This will create your `dist` folder which will have all the production ready files