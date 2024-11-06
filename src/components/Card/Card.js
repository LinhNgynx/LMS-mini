import React from "react";

export default function Card({ content, state, handleClick }) {
  return (
    <div 
      onClick={handleClick}
      className={`card ${state ? "revealed" : "hidden"}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px",
        margin: "5px",
        cursor: "pointer",
        backgroundColor: state ? "lightblue" : "lightgray",
        borderRadius: "5px",
        fontSize: "1.5em",
        fontWeight: "bold",
      }}
    >
      {state ? content : "?"}
    </div>
  );
}
