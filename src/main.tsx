import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./Routes/App/App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./Routes/SignUp/SignUp.tsx";
import { SignIn } from "./Routes/SignIn/SignIn.tsx";
import { CreateEnsemble } from "./Routes/CreateEnsemble/CreateEnsemble.tsx";
import { EnsemblesPage } from "./Routes/EnseblesPage/EnsemblesPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-ensemble" element={<CreateEnsemble />} />
        <Route path="/ensembles" element={<EnsemblesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
