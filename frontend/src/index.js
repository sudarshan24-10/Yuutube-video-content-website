import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from "./App";
import "../src/index.css";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h1 className="error-heading">Oops!</h1>
      <p className="error-message">{error.message}</p>
      <button className="reset-button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
const el=document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>
  
);
