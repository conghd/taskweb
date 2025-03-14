# Task Manager App

## Description
The **Task Manager App** is a web application built with React and Material UI to help users efficiently manage their tasks. It provides task creation, updating, deletion, and filtering features with a modern UI and responsive design.

## Features
- ✅ **Create, Update, and Delete Tasks**
- 🎨 **Modern UI** using Material UI
- 🔍 **Search & Filtering** for tasks
- 🌐 **Responsive & Accessible** design
- 🚀 **Optimized for Performance**

---

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/conghd/taskweb.git
cd taskweb
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add:
```sh
REACT_APP_API_URL=
REACT_APP_DEBUG=true
```

---

## Running the App

### Development Mode
```sh
npm run dev
```
Runs the app in development mode at `http://localhost:5173`.

### Build for Production
```sh
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Serve the Production Build
Using `serve`:
```sh
npm install -g serve
serve -s dist -l 3000
```

Using PM2:
```sh
npm install -g pm2
pm2 start ecosystem.config.js --env production
```

---

## Deployment
### Deploy to Vercel
```sh
vercel deploy
```

### Deploy to Netlify
```sh
netlify deploy
```

### Deploy to Firebase Hosting
```sh
firebase deploy
```

---

## Folder Structure
```
taskweb/
├── public/         # Static assets
├── src/            # Source code
│   ├── components/ # UI components (Material UI)
│   ├── pages/      # Page components
│   ├── hooks/      # Custom hooks
│   ├── utils/      # Helper functions
│   ├── config/     # Configuration files
│   ├── styles/     # Global styles
│   ├── App.js      # Main App component
│   ├── index.js    # Entry point
├── .env            # Environment variables
├── package.json    # Dependencies & scripts
├── README.md       # Documentation
└── ecosystem.config.js # PM2 config
```

---

## License
This project is licensed under the MIT License.

---

## Contributors
- [Michael Hoang](https://github.com/conghd)

### Feel free to contribute! 🚀
