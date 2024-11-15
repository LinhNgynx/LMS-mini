import React from "react";
import Income from "./components/ExpenseTracker/Income/Income";
import Homepage from "./components/ExpenseTracker/HomePage/Homepage";
import Expense from "./components/ExpenseTracker/Expense/Expense";
import { ExpenseProvider } from "./context/ExpenseContext";
import NavBar from "./components/ExpenseTracker/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function ExpenseApp() {
  return (
    <>
    <ExpenseProvider>
      <Router>
        <NavBar/>
         <Routes>
         <Route path="/" element={<Homepage/>} />
          <Route path="/homepage" element={<Homepage/>}></Route>
          <Route path="/expense" element={<Expense/>}></Route>
          <Route path="/income" element={<Income/>}></Route>
         </Routes>
      </Router>
      </ExpenseProvider>
    </>
  );
}

export default ExpenseApp;
