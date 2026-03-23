# Welcome to Group 2 Todo-app.

## About

A simple Todo App where you can add, update, and delete tasks.

Made by:

- [ASW-programming](https://github.com/ASW-programming)
- [Biixie1](https://github.com/Biixie1)
- [Kimelliotkarlsson](https://github.com/kimelliotkarlsson)

## Features

- Read todos from Database
- Create todos
- Edit existing todos
- Delete existing todos

## Requirements

- [GIT](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Firebase](https://console.firebase.google.com/u/1/)

## Packages

- [Concurrently](https://www.npmjs.com/package/concurrently)
- [React + Vite](https://vite.dev/)
- [TanStack useQuery](https://tanstack.com/query/latest)
- [Firebase Admin](https://www.npmjs.com/package/firebase-admin)
- [Express](https://www.npmjs.com/package/express)
- [Cors](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Getting started

1. Clone the project `git clone https://github.com/ASW-programming/Group2-TodoApp`
2. Go to Firebase website and create a project.
3. Create `serviceAccountKey.js` file in root directory
4. Create the follwing variable and insert the `serviceAccountKey` from Firebase

```js
export const serviceAccount = {};
```

**IMPORTANT** - Add this file to .gitignore if it's missing.

## Installing node packages

### Root directory

1. Open terminal
2. `npm install` to install required packages

### Backend

1. `cd backend` to enter backend directory
2. `npm install` to install required packages
3. `cd ..` to return to root directory

### Frontend

1. `cd frontend` to enter frontend directory
2. `npm install` to install required packages
3. `cd ..` to return to root directory

## Starting the project

1. Open terminal
2. `npm run dev` in root directory to start Frontend and backend.
