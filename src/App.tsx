// import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChangePassword } from "./Routes/ChangePassword/ChangePassword";
import { CreateEnsemble } from "./Routes/CreateEnsemble/CreateEnsemble";
import { EditProfile } from "./Routes/EditProfile/EditProfile";
import { EnsemblesPage } from "./Routes/EnsemblesPage/EnsemblesPage";
import { Profile } from "./Routes/Profile/Profile";
import { ProfileSettings } from "./Routes/ProfileSettings/ProfileSettings";
import { SignIn } from "./Routes/SignIn/SignIn";
import { SignUp } from "./Routes/SignUp/SignUp";
import { Index } from "./components/Index/Index";
import { CreatePost } from "./Routes/CreatePost/CreatePost";
import { AddIntrument } from "./Routes/AddIntrument/AddInstrument";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-ensemble" element={<CreateEnsemble />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/ensembles" element={<EnsemblesPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-intrument" element={<AddIntrument />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
