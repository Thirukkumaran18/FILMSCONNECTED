import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css'; // Optional: style file

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', password: ''
  });

  const handleChange = async(e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      console.log("Login details : ", data);
      if(res.ok){
        console.log("login successful");
        localStorage.setItem("userCredentials", JSON.stringify(data.user));
        setFormData({name:'', password:''});
         onLoginSuccess();
        navigate("/home");
      }else{
        alert("Invalid credentials")
        console.log("Login failed");
      }
    } catch (e) {
      alert(e.message())
      console.log("catch from front end", e.message);

    }
  }

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit} >
        <label>
          Username:
          <input type="text" name="name" placeholder="Enter your username" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Password:
          <div className="passwordField">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
