import { createContext, useEffect, useState } from "react";

export const ExpenseContext=createContext();
export const ExpenseProvider=({children})=>{
    const [expense, setExpense]=useState(()=>{
        const savedExpense=localStorage.getItem('savedFee');
        return savedExpense? JSON.parse(savedExpense) : [];
    });
    const [income, setIncome]=useState(()=>{
        const savedIncome=localStorage.getItem('savedMoney');
        return savedIncome? JSON.parse(savedIncome) : [];
    });
    useEffect(()=>{
        localStorage.setItem('savedFee', JSON.stringify(expense));
    },[expense]);
    useEffect(()=>{
        localStorage.setItem('savedMoney', JSON.stringify(income));
    },[income]);
    return (
        <ExpenseContext.Provider value={{expense, setExpense, income, setIncome}}>
            {children}
        </ExpenseContext.Provider>
    )
}