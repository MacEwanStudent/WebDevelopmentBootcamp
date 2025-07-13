// src/LoginForm.jsx
import React from 'react';
import Input from './Input'
import './App.css'; // Optional: if styles are shared

function LoginForm() {
  return (
    <form className="form">
      <Input
      type="text"
      placeholder="UserName" 
      />
      <Input
      type="password"
      placeholder="Password" 
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
