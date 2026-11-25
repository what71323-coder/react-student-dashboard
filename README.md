# React TypeScript Student Management Dashboard

A modern, responsive Student Management Dashboard built using React, TypeScript, and Vite.

## Project Overview

This application helps users manage student records through an interactive dashboard. It provides student CRUD operations, search, filtering, sorting, pagination, and CSV export functionality.

## Features

- Add new student records
- Edit existing student information
- Delete student records
- Search students by name and email
- Filter students by course and enrollment status
- Sort records by name and course
- Dashboard summary statistics
- Form validation
- Save student records using localStorage
- Pagination for student records
- Export student data to CSV
- Environment variable configuration
- Lazy loading using React.lazy and Suspense
- Responsive user interface

## Technology Stack

- React 19
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Project Structure

```text
react-student-dashboard/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── components/
    ├── data/
    ├── pages/
    ├── styles/
    ├── types/
    ├── utils/
    ├── App.tsx
    └── main.tsx
```

## Installation

Clone the repository:

```bash
git clone https://github.com/what71323-coder/react-student-dashboard.git
```

Open the project folder:

```bash
cd react-student-dashboard
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and configure:

```env
VITE_APP_TITLE=Student Management Dashboard
VITE_APP_SUBTITLE=Manage students, courses and enrollment records.
VITE_APP_VERSION=1.0.0
```

## Run Development Server

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Screenshots

Add your dashboard screenshot in the `screenshots` folder.

Example:

```text
screenshots/dashboard.png
```

![Student Dashboard](screenshots/dashboard.png)

## Author

Raj Singh

## License

This project is created for educational and internship purposes.