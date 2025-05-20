# Frontend Documentation

## Overview

This frontend application is designed to facilitate a 1-on-1 matching and feedback tool. It allows users to add startups, view a list of startups, and interact with various features through an intuitive UI. The application uses React, react-router-dom for routing, and Tailwind CSS for styling.

---

# Table of Contents

1. [Routes](#routes)
   - [Home Page (/)](#-home-page)
   - [Add Startup Page (/add-startup)](#add-startup-page-add-startup)
   - [View Startups Page (/view-startups)](#view-startups-page-view-startups)
   - [Add Coaches and View Coaches (/add-coaches and /view-coaches)](#add-coaches-and-view-coaches-add-coaches-and-view-coaches)
2. [Pages](#pages)
   - [Home](#home)
   - [AddStartup](#addstartup)
   - [AddStartupView](#addstartupview)
3. [Styling](#styling)
4. [API Integration](#api-integration)
   - [Add Startup](#add-startup)
   - [View Startups](#view-startups)
5. [Environment Variables](#environment-variables)
6. [Future Enhancements](#future-enhancements)
   - [Complete Schedule Functionality](#complete-schedule-functionality)
   - [Add Coaches Functionality](#add-coaches-functionality)
   - [Responsive Design](#responsive-design)
7. [Theme Switching with Tailwind CSS](#theme-switching-with-tailwind-css)

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Modal/
│   │   │   └── Modal.jsx
│   ├── pages/
│   │   ├── AddStartup/
│   │   │   └── AddStartup.jsx
│   │   ├── AddStartupView/
│   │   │   └── AddStartupView.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
└── tailwind.config.js

```

## Routes

The routes are defined in App.js and managed using react-router-dom. Here are the details:

### / (Home Page)

- Component: Home.jsx
- Description: The main entry point of the application, providing options to navigate to different features such as adding startups, viewing startups, adding coaches, and starting matching.
- Buttons:
  - Add Startup (/add-startup)
  - View Startups (/view-startups)
  - Add Coaches (/add-coaches) \*needs to be implemented
  - View Coaches (/view-coaches) \*needs to be implemented
  - Start Matching (/view-coaches) \*needs to be implemented

### /add-startup (Add Startup Page)

- Component: AddStartup.jsx
- Description: A form for users to add details about a startup. Data is submitted to the backend via an API call.

### /view-startups (View Startups Page)

- Component: AddStartupView.jsx
- Description: Displays a table of all startups fetched from the backend. Includes details like startup name, members, primary contact, and meetings count.

### /add-coaches and /view-coaches

- Description: These routes are placeholders for managing and viewing coach data.

---

## Pages

### Home

- File: Home.jsx
- Purpose: Acts as the dashboard, offering buttons to navigate to key routes.

### AddStartup

- File: AddStartup.jsx
- Purpose: Allows users to add a new startup.
- Features:
  - Input fields for startup details (e.g., name, members, contacts, description, website).
  - Validation for required fields.
  - Submits data to the backend API.
  - Success and error handling.

### AddStartupView

- File: AddStartupView.jsx
- Purpose: Displays a list of startups fetched from the backend.
- Features:
  - Fetches startup data from the backend using an API call.
  - Displays data in a table format.
  - Handles loading and error states.

---

## Styling

The application uses Tailwind CSS for styling. Key classes are used for:

- Layout: (e.g., flex, grid, min-h-screen).
- Buttons: (rounded, shadow-lg, hover:bg-opacity-100).
- Modals: (fixed, inset-0, bg-opacity-50).

---

## API Integration

### Add Startup

- Endpoint: /startups
- Method: POST
- Request: JSON payload with startup details.
- Response: Confirmation of successful addition or error details.

### View Startups

- Endpoint: /startups
- Method: GET
- Request: None
- Response: List of startups in JSON format.

---

## Environment Variables

The application supports a backend URL configuration via an environment variable:

- REACT_APP_BACKEND_URL: Defines the base URL for API requests (default: http://127.0.0.1:5000).

---

## Future Enhancements

### Complete Schedule Functionality

- Implement scheduling in Schedule.jsx -> Start Matching button.

### Add Coaches Functionality

- Develop components for adding and viewing coaches.
- Add Coaches (/add-coaches)
- View Coaches (/view-coaches)

### Responsive Design

- Ensure all pages are fully responsive across devices.

---

## Theme Switching with Tailwind CSS

### Overview

Tailwind CSS provides flexible support for theme switching, including built-in dark mode and custom theme management using CSS variables. Here's how theme switching can be implemented:

### Dark Mode

- Tailwind supports dark mode using either `media` (default) or `class` strategy. To enable class-based dark mode:

```javascript
module.exports = {
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a5b4fc", // Light theme primary color
          dark: "#6366f1", // Dark theme primary color
        },
      },
    },
  },
};
```

- Toggle themes by adding or removing the `dark` class on the `html` or `body` element:

```html
<body class="dark">
  <div class="bg-primary-light dark:bg-primary-dark">Hello, World!</div>
</body>
```

### Custom Themes with CSS Variables

- Use CSS variables to define custom themes:

```css
:root {
  --color-primary: #4ade80; /* Default (light) theme */
}
.dark {
  --color-primary: #22c55e; /* Dark theme */
}
```

- Reference these variables in Tailwind:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
    },
  },
};
```

### JavaScript Theme Toggle

- Dynamically switch themes with JavaScript:

```javascript
const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
};
```

- Use a button for interaction:

```html
<button onclick="toggleTheme()">Toggle Theme</button>
```

### Tailwind Plugins

- For advanced theme management, plugins like [daisyUI](https://daisyui.com/) provide prebuilt themes and utilities.

By leveraging these features, Tailwind CSS enables dynamic and flexible theme switching, enhancing user experience for different modes and preferences.
