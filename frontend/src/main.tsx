import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Include Tailwind CSS

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <App />
  </StrictMode>,
);
