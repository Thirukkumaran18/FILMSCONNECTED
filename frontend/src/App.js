import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Favourites from './Pages/Favourites';
import NewUser from './Pages/NewUser';
import Comments from './Pages/Comments';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userCredentials"));

  useEffect(() => {
    // Listen for localStorage changes (logout from another tab)
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("userCredentials"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NewUser />} />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <>
              <Navbar />
              <Home onLogout={() => setIsLoggedIn(false)} />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/comments"
        element={
          isLoggedIn ? (
            <>
              
              <Comments  />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/favourite" element={<Favourites />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
    </Routes>
  );
}

export default App;
