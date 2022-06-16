import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {Login, Main, PageNotFound} from './Routes/index';
import {BrowserRouter, Router} from "react-router-dom";
import {Route, Routes} from "react-router";
import MainHeader from "./Components/MainHeader";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.querySelector("html").classList.add("light");

root.render(
      <BrowserRouter basename={"/"}>
          <Routes>
              <Route path={'/'}>
                  <Route index element={<Main />} />
                  <Route path={"/"} element={<Main />} />
                  <Route path={"/home"} element={<Main />} />
                  <Route path={"/info"} element={<Main />} />
                  <Route path={"/contatti"} element={<Main />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/*"} element={<PageNotFound />}/>
              </Route>
          </Routes>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
