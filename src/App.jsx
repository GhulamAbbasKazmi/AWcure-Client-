import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import ProtectedRoute from "./routing/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import lightBackround from "./assets/background-tubes.jpg";
import darkBackround from "./assets/background-leaves.jpg";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className="App"
      style={{
        backgroundImage: !darkMode
          ? `url(${lightBackround})`
          : `url(${darkBackround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset/:userId/:token" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/verify-account/:userId/:token"
              element={<Profile />}
            />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
