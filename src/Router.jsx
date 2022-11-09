import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { RequireAuth } from "./Security/RequireAuth";
import { AuthProvider } from "./Store/AuthProvider";

const ROLES = [2001, 5150];

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
            <Route path="/" element={<Main/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
