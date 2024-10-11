import React, { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [expression, setExpression] = useState("");
  const displayNumber = (number) => {
    if (
      expression === "Error" ||
      (result !== null && expression === result.toString())
    ) {
      const newExpression = number.toString();
      setExpression(newExpression);
    } else {
      const newExpression = expression + number.toString();
      setExpression(newExpression);
    }
  };
  const displayOperand = (operand) => {
    if (expression === "Error") {
      setExpression("");
    } else {
      const newExpression = expression + operand;
      setExpression(newExpression);
    }
  };
  const calculate = () => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
      setExpression(evalResult.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const clearExpression = () => {
    setExpression("");
    setResult(null);
  };

  return (
    <div className="container">
      <div className="result">{expression || "0"}</div>
      <div className="row">
        <button onClick={clearExpression}>C</button>
        <button onClick={() => displayNumber(0)}>0</button>
        <button onClick={() => displayNumber(1)}>1</button>
        <button onClick={() => displayOperand("+")}>+</button>
      </div>
      <div className="row">
        <button onClick={() => displayNumber(2)}>2</button>
        <button onClick={() => displayNumber(3)}>3</button>
        <button onClick={() => displayNumber(4)}>4</button>
        <button onClick={() => displayOperand("-")}>-</button>
      </div>
      <div className="row">
        <button onClick={() => displayNumber(5)}>5</button>
        <button onClick={() => displayNumber(6)}>6</button>
        <button onClick={() => displayNumber(7)}>7</button>
        <button onClick={() => displayOperand("*")}>*</button>
      </div>
      <div className="row">
        <button onClick={() => displayNumber(8)}>8</button>
        <button onClick={() => displayNumber(9)}>9</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => displayOperand("/")}>/</button>
      </div>
    </div>
  );
}

export default App;
