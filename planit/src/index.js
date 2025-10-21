import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // <-- must import Tailwind CSS here
import App from './App';
import logo from './assets/logo_Plan_it.png'; // Correct for VS Code

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
