import React from 'react'
import CreateQuiz from './components/Quiz/CreateQuiz/CreateQuiz'
import AttemptQuiz from './components/Quiz/AttemptQuiz/AttemptQuiz'
import Sidebar from './components/Quiz/SideBar/Sidebar'
import { QuizProvider } from './context/QuizContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
export default function QuizApp() {
  return (
    <div>
        <QuizProvider>
            <Router>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path='Create-Quiz' element={<CreateQuiz />}></Route>
                    <Route path='Attempt-Quiz' element={<AttemptQuiz />}></Route>
                </Routes>
            </Router>
        </QuizProvider>
    </div>
  )
}
