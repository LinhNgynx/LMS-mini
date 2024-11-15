import React, { useContext, useState } from "react";
import { ExpenseContext } from "../../../context/ExpenseContext";
import "../css/Modal.css";

export default function Income() {
  const { income, setIncome } = useContext(ExpenseContext);
  const [form, setForm] = useState({
    id: null,
    amount: "",
    category: "",
    description: "",
    Date: null,
  });
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (prop, e) => {
    if (prop === "amount" && e.target.value <= 0) {
      alert("Cannot be Negative or Zero");
      return;
    }
    const newInput = { ...form, [prop]: e.target.value };
    setForm(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncome((prev) => [
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
    setIncome((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, ...input } : inc))
    );
    setInput({});
    setEdit(false);
  };

  const handleChangeEdit = (prop, e) => {
    if (prop === "amount" && e.target.value <= 0) {
      alert("Cannot be Negative or Zero");
      return;
    }
    const newInput = { ...input, [prop]: e.target.value };
    setInput(newInput);
  };

  const handleDelete = (id) => {
    setIncome((prev) => prev.filter((inc) => inc.id !== id));
  };

  const handleEdit = (id) => {
    setInput(income.find((inc) => inc.id === id));
    setEdit(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="income"
            id="income"
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
            <option value="Freelance">Freelance</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
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
        {income.length !== 0 && (
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
              {income.map((inc, i) => (
                <tr key={inc.id}>
                  <td>{i + 1}</td>
                  <td>{inc.amount}</td>
                  <td>{inc.category}</td>
                  <td>{inc.description}</td>
                  <td>
                    <button onClick={() => handleEdit(inc.id)}>Edit</button>
                    <button onClick={() => handleDelete(inc.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {edit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={(e) => handleSubmitEdit(e, input.id)}>
                <input
                  type="number"
                  name="income"
                  id="income"
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
                  <option value="Freelance">Freelance</option>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
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
          </div>
        )}
      </div>
    </>
  );
}
