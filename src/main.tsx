import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./Routes/App/App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./Routes/SignUp/SignUp.tsx";
import { SignIn } from "./Routes/SignIn/SignIn.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
