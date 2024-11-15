import React, { useContext, useState } from "react";
import { ExpenseContext } from "../../../context/ExpenseContext";
import '../css/Modal.css'
export default function Expense() {
  const { expense, setExpense } = useContext(ExpenseContext);
  const [form, setForm] = useState({
    id: null,
    amount: "",
    category: "",
    description: "",
    Date: null,
  });
  const [edit, setEdit]=useState(false);
  const [input,setInput] = useState({});
  const handleChange = (prop, e) => {
    if(prop==='amount'&&e.target.value<=0){
         alert("Cannot be Negative or Zero");
         return;
    }
    const newInput = { ...form, [prop]: e.target.value};
    setForm(newInput);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setExpense((prev) => [
      ...prev,
      { ...form, id: Date.now(), Date: Date.now() },
    ]);
    setForm({
      id: null,
      amount: "",
      category: "",
      description: "",
      Date: null,
    });
  };
  const handleSubmitEdit = (e, id) => {
    e.preventDefault();
      setExpense((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, ...input } : exp))
      );
      setInput({});
      setEdit(false);
  };
  const handleChangeEdit = (prop, e) => {
    if(prop==='amount'&&e.target.value<=0){
        alert("Cannot be Negative or Zero");
        return;
   }
    const newInput = { ...input, [prop]: e.target.value };
    setInput(newInput);
  };
  const handleDelete = (id) => {
    setExpense((prev) => prev.filter((exp) => exp.id !== id));
  };
  const handleEdit = (id) => {
    setInput(expense.find((exp) => exp.id === id));
    setEdit(true);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="expense"
            id="expense"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => handleChange("amount", e)}
            required
          ></input>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={(e) => handleChange("category", e)}
            required
          >
            <option value="" disabled hidden>
              Choose one
            </option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Groceries">Groceries</option>
          </select>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e)}
            required
          ></input>
          <input type="submit" value="Add"></input>
        </form>
        {expense.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((exp, i) => (
                <tr key={exp.id}>
                  <td>{i+1}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{exp.description}</td>
                  <td>
                    <button onClick={() => handleEdit(exp.id)}>Edit</button>
                    <button onClick={() => handleDelete(exp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
        {edit &&
        <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={(e)=>handleSubmitEdit(e, input.id)}>
              <input
                type="number"
                name="expense"
                id="expense"
                placeholder="Amount"
                value={input.amount}
                onChange={(e) => handleChangeEdit("amount", e)}
                required
              ></input>
              <select
                name="category"
                id="category"
                value={input.category}
                onChange={(e) => handleChangeEdit("category", e)}
                required
              >
                <option value="" disabled hidden>
                  Choose one
                </option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Groceries">Groceries</option>
              </select>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={input.description}
                onChange={(e) => handleChangeEdit("description", e)}
                required
              ></input>
              <input type="submit" value="Update"></input>
            </form>
            </div>
            </div>}
      </div>
    </>
  );
}
