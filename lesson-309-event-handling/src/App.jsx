import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react';

function App() {

  const [isMouseOver, setMouseOver] = useState(false);
  const [name, setName]= useState("");
  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
    eMail: ""
  });


  function handleClick() {
    console.log("Clicked");
  }

  const buttonStyle = {
    backgroundColor: isMouseOver ? "black" : "white",
    transition: "background-color 0.3s ease",
  };

  function handleChange(e){
    const {value, name}= e.target;

    setFullName(prev => ({
    ...prev,
    [name]: value
    }));

    /*setfullName(prevValue =>{
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else if (name === "lName"){
        return {
          fName: prevValue.fName,
          lName: value
        };
      }
    })*/
  }

  function updateFName(e){
    setFirst(e.target.value)
  }

  function updateLName(e){
    setLast(e.target.value)
  }

  function setFirstName(e){
    e.preventDefault(); // ⚠️ Important to prevent page reload
    setFirst(name);
    console.log(name);
    console.log(fName);
  }
   function setLastName(e){
    e.preventDefault(); // ⚠️ Important to prevent page reload
    setLast(name);
  }

  return (
    <>
      <div className="container">
        <h1>Hello {fullName.fName} {fullName.lName}</h1>
        <p>{fullName.eMail}</p>
        <form onSubmit={setFirstName}>
          <input 
            type="text"
            name="fName" 
            onChange={handleChange}
            id="fName"
            value={fullName.fName} 
            placeholder="First Name" />
            <input 
            type="text"
            name="lName" 
            onChange={handleChange}
            id="lName"
            value={fullName.lName} 
            placeholder="Last Name" />
            <input 
            type="text"
            name="eMail" 
            onChange={handleChange}
            id="eMail"
            value={fullName.eMail} 
            placeholder="e-mail" />
            <button type="submit"
              style={buttonStyle} 
              onMouseOver={() => setMouseOver(true)} 
              onMouseOut={() => setMouseOver(false)}
              >Submit
            </button>
        </form>
      </div>
    </>
  );
}

export default App
