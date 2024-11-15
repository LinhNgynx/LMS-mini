import React, { useContext } from 'react';
import { ExpenseContext } from '../../../context/ExpenseContext';

export default function Homepage() {
  const { expense, income } = useContext(ExpenseContext);

  // Calculate totals
  const totalExpenses = expense.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  // Display recent transactions (e.g., last 5)
  const recentExpenses = expense.slice(-5).reverse();
  const recentIncome = income.slice(-5).reverse();

  return (
    <div className="homepage">
      <h1>Financial Overview</h1>
      <div className="totals">
        <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
        <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        <h2>Net Balance: ${netBalance.toFixed(2)}</h2>
      </div>
      
      <div className="transactions">
        <h3>Recent Income</h3>
        <ul>
          {recentIncome.map((inc) => (
            <li key={inc.id}>
              {inc.category}: ${inc.amount} - {inc.description}
            </li>
          ))}
        </ul>

        <h3>Recent Expenses</h3>
        <ul>
          {recentExpenses.map((exp) => (
            <li key={exp.id}>
              {exp.category}: ${exp.amount} - {exp.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
