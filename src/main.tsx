import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AccessGate } from './components/AccessGate.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <AccessGate>
      <App />
    </AccessGate>
  </ErrorBoundary>
);
