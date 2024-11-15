import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Sidebar() {
    const navigate=useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
      };
  return (
    <div>
        <button onClick={()=>handleNavigate('/Create-Quiz')}>Create Quiz</button>
        <button onClick={()=>handleNavigate('/Attempt-Quiz')}>Attempt Quiz</button>
    </div>
  )
}
