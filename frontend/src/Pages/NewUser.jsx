import React from 'react';
import '../Style/NewUser.css'; 


function NewUser() {
  return (
    <div className="newUserContainer">
      <div className="overlay">
        <div className="welcomeBox">
          <h1>🎬 Welcome to Films Connected</h1>
          <p>New here? Register now or login to continue!</p>
          <div className="btnGroup">
            <a href="/register">Register</a>
            <a href="/login" >Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
