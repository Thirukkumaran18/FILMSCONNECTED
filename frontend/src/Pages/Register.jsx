import { useState } from 'react';
import '../Style/Register.css'; // Optional for styling

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name:'', age:'', email:'', phoneNumber:'', password:''
  });
  
  const handleChange = async(e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/register", {
        method:'POST', 
        headers : { "Content-Type": "application/json" }, 
        body : JSON.stringify(formData)
      });
      const data = await res.text();
      console.log("Server response:", data);
      if (res.ok) {
        console.log('Registered successfully!');
        setFormData({ name:'', age:'', email:'', phoneNumber:'', password:'' });
      } else {
        console.log('Registration failed.');
      }


    }catch(e){
      console.error(e.message);
    }
  }

  return (
    <div className="registerContainer">
      <h2>ON BOARDING</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        {['name','age','email','phoneNumber','password'].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === 'password' ? (
              <div className="passwordField">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={formData.password}
                  onChange={handleChange} required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '👁️' : '🙈'}
                </span>
              </div>
            ) : (
              <input
                type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'tel'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                required
              />
            )}
          </label>
        ))}

        

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
