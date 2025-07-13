import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginForm from './LogInForm';
import './App.css'

var isLoggedIn= false;

function renderConditionally(){
  return isLoggedIn === true? <h1>Hello</h1> : <LoginForm />;
}

function App() {
  
  return (
    <>
      <div className="container">
        {renderConditionally()}
      </div>
    </>
  )
}

export default App
