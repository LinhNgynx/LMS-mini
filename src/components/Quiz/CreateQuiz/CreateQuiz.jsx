import React, { useContext, useState } from "react";
import { QuizContext } from "../../../context/QuizContext";
export default function CreateQuiz() {
  const { quiz, setQuiz } = useContext(QuizContext);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      topic: "",
    },
    {
      id: 2,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      topic: "",
    },
    {
      id: 3,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      topic: "",
    },
    {
      id: 4,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      topic: "",
    },
  ]);
  const [subject, setSubject] = useState("");
  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleChange = (prop, id, e) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, [prop]: e.target.value } : question
      )
    );
  };
  const handleChangeOption = (num, id, e) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              options: question.options.map((option, i) =>
                i === num ? e.target.value : option
              ),
            }
          : question
      )
    );
  };
  const handleSelect = (id, num) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? { ...question, correctAnswer: question[num] }
          : question
      )
    );
  };
  const handleSubmit=(e)=>{
     e.preventDefault();
     setQuiz((prev)=>({...prev, [subject]: questions}));
     setSubject("");
     setQuestions([
        {
          id: 1,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          topic: "",
        },
        {
          id: 2,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          topic: "",
        },
        {
          id: 3,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          topic: "",
        },
        {
          id: 4,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          topic: "",
        },
      ]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="subject"
          value={subject}
          onChange={handleChangeSubject}
        ></input>
        <br></br>
        {questions.map((question) => (
          <div key={question.id}>
            <label htmlFor={`question-${question.id}`}>
              Question {question.id}:
            </label>
            <input
              type="text"
              id={`question-${question.id}`}
              name={`question-${question.id}`}
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleChange("question", question.id, e)}
            ></input>
            <br></br>
            {["A", "B", "C", "D"].map((label, index) => (
              <div key={index}>
                <label>{label}</label>
                <input
                  type="text"
                  value={question.options[index]}
                  onChange={(e) => handleChangeOption(index, question.id, e)}
                  placeholder={`Option ${label}`}
                ></input>
              </div>
            ))}
            <select
              value={question.correctAnswer}
              onChange={(e) => handleSelect(question.id, e.target.value-"A")}
            >
              <option disabled hidden value="">
                Choose Correct Answer
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        ))}
        <input type='submit' value='Create'></input>
      </form>
    </div>
  );
}
