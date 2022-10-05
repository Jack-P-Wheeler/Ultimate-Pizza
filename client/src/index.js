import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import UserProvider from "./components/UserContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-6m-svdl7.us.auth0.com"
    clientId="JDGS4w3zL0QrcZQ5dp8W8DUbSmrNGn19"
    redirectUri={window.location.origin}
  >
    <UserProvider>
      <App />
    </UserProvider>
    
  </Auth0Provider>
  </React.StrictMode>
);
