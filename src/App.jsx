import { useState , useEffect } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  let [darkMode,setDarkMode] = useState(localStorage.getItem("darkMode")==="true"|| false);
  let [best,setBest] = useState(Number(localStorage.getItem("best"))||0);
  
  useEffect(()=>{localStorage.setItem("darkMode",darkMode),[darkMode]});
  
  useEffect(()=>{localStorage.setItem("best",best)},[best]);

  function changeTheme()
  {
    setDarkMode((prev)=>!prev);
  }
 
  return (
    <>
      <Navbar darkMode={darkMode} changeTheme={changeTheme} best={best}/>
      <Home darkMode={darkMode} best={best} setBest={setBest}/>
    </>
  )
}

export default App
