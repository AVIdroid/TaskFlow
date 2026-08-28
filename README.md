# To-Do List App

Basic full-stack web application for task management.

- Built a full-stack To-Do List application using Node.js, Express.js and PostgreSQL.
- Implemented CRUD operations with EJS templates, enabling efficient task creation and management.
- Designed a responsive frontend using HTML and CSS for seamless user interaction.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS
- HTML / CSS

## Project Structure

```
todo-app/
├── public/
│   └── css/
│       └── style.css
├── routes/
│   └── todos.js
├── views/
│   ├── index.ejs
│   └── edit.ejs
├── db.js
├── server.js
├── schema.sql
├── .env.example
└── package.json
```

## Setup

1. Clone the repo
   ```
   git clone https://github.com/AVIdroid/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a PostgreSQL database and run `schema.sql` to create the `todos` table.

4. Copy `.env.example` to `.env` and fill in your database credentials.
   ```
   cp .env.example .env
   ```

5. Start the server
   ```
   npm start
   ```

6. Open `http://localhost:3000` in your browser.

## Features

- Add a new task with a title and optional description
- Mark a task as done / undo it
- Edit an existing task
- Delete a task
- Responsive layout that works on mobile and desktop
