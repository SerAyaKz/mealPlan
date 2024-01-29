import React from "react";
import { Home, Form, User, Recipe, Random } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/recipe/:recipe_id" element={<Recipe />} />
      <Route path="/user/:userID" element={<User />} />
      <Route path="/list" element={<User />} />
      <Route path="/random" element={<Random />} />
    </Routes>
  </BrowserRouter>
);

export default App;
