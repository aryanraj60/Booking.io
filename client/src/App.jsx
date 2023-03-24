import { useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, Login, Register, AccountPage, PlacePage } from "./pages";
import axios from "axios";
import { UserContextProvider } from "./Context/UserContext";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/account/:subpage/:action" element={<AccountPage />} />
            <Route
              path="/account/:subpage/edit/:id"
              element={<AccountPage />}
            />
            <Route path="/place/:id" element={<PlacePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
