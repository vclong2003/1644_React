import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./Routes/Home";
import NavigationBar from "./Component/NavBar";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { api_endpoint } from "./config";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";
import { setUser } from "./Redux/user";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  axios
    .get(`${api_endpoint}/user`, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        dispatch(setUser({ singedIn: true, ...response.data }));
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
