import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NavBar() {
const navigate=useNavigate();
const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <>
    <div>
        <button onClick={() => handleNavigate('/homepage')}>Home</button>
        <button onClick={() => handleNavigate('/expense')}>Expense</button>
        <button onClick={() => handleNavigate('/income')}>Income</button>
    </div>
    </>
  )
}
