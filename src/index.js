import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import { createBrowserHistory } from "history";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <CookiesProvider>
        <HashRouter>
                <App/>
        </HashRouter>
        </CookiesProvider>
    </React.StrictMode>
);

reportWebVitals();
