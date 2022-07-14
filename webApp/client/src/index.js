import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {
    CONTACTS_PATH,
    Dashboard, DASHBOARD_PATH, HOME_PATH,
    HOME_PATH_COMP,
    INFO_PATH,
    Login,
    LOGIN_PATH, LOGOUT_PATH,
    Main,
    PageNotFound, SETTINGS_PATH, SIGNUP_PATH
} from './Routes/index';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Signup from "./Routes/Login/signup";
import Logout from "./Routes/Login/logout";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.querySelector("html").classList.add("light");

root.render(
    <BrowserRouter basename={"/"}>
        <Routes>
              <Route path={HOME_PATH_COMP}>
                  <Route index element={<Main />} />
                  <Route path={HOME_PATH_COMP} element={<Main />} />
                  <Route path={HOME_PATH} element={<Main />} />
                  <Route path={INFO_PATH} element={<Main />} />
                  <Route path={CONTACTS_PATH} element={<Main />} />
                  <Route path={LOGIN_PATH} element={<Login />} />
                  <Route path={SIGNUP_PATH} element={<Signup />} />
                  <Route path={LOGOUT_PATH} element={<Logout />} />
                  <Route path={DASHBOARD_PATH} element={<Dashboard />} />
                  <Route path={SETTINGS_PATH} element={<Dashboard />} />
                  <Route path={"/*"} element={<PageNotFound />}/>
              </Route>
          </Routes>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();