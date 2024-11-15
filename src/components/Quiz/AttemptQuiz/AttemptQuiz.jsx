import React, { useContext, useState } from "react";
import { QuizContext } from "../../../context/QuizContext";
import './Quiz.css'
export default function AttemptQuiz() {
  const { quiz, setQuiz } = useContext(QuizContext);
  const [selected, setSelected] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [points, setPoints] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleted, setDeleted] = useState("");
  const handleSelect = (subject) => {
    const selectedQuiz = quiz[subject];
    setSelected(selectedQuiz);
    setPoints(
      selectedQuiz.map((q) => ({ questionID: q.id, point: 0, selected: "" }))
    );
  };

  const handleBack = () => {
    setSelected([]);
    setPoints([]);
    setSubmit(false);
  };

  const handleSubmit = () => {
    setSubmit(true);
  };

  const handleSelectOption = (questionID, optionID) => {
    const foundQuestion = selected.find(
      (question) => question.id === questionID
    );
    const isCorrect =
      foundQuestion.options[optionID] === foundQuestion.correctAnswer;
    setPoints((prev) =>
      prev.map((p) =>
        p.questionID === questionID
          ? {
              ...p,
              point: isCorrect ? 1 : 0,
              selected: foundQuestion.options[optionID],
            }
          : p
      )
    );
  };
  const handleDelete = (subject) => {
    const updatedQuiz = { ...quiz };
    delete updatedQuiz[subject];
    setQuiz(updatedQuiz);
    setModal(false);
  };
  const totalPoint = points.reduce((sum, { point }) => sum + point, 0);

  if (!quiz || !Object.keys(quiz).length) {
    return <div>No quiz available</div>;
  }

  return (
    <div>
      <h2>Attempt Quiz</h2>
      {selected.length === 0 ? (
        Object.keys(quiz).map((subject, index) => (
          <div key={index} onClick={() => handleSelect(subject)}>
            <h3>{subject}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                setModal(true);
                setDeleted(subject);
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div>
          {submit ? (
            <div>
              <div>Score: {totalPoint}</div>
              {selected.map((question) => (
                <div key={question.id}>
                  <p>
                    Question {question.id}: {question.question}
                  </p>
                  <p>
                    Selected:{" "}
                    {
                      points.find((point) => point.questionID === question.id)
                        .selected
                    }
                  </p>
                  <p>Answer: {question.correctAnswer}</p>
                  <p>
                    Point:{" "}
                    {
                      points.find((point) => point.questionID === question.id)
                        .point
                    }
                  </p>
                </div>
              ))}
              <button onClick={handleBack}>Back</button>
            </div>
          ) : (
            <div className="quiz-list">
              {selected.map((question) => (
                <div key={question.id} className="quiz-card">
                  <p>
                    Question {question.id}: {question.question}
                  </p>
                  {question.options.map((option, i) => (
                    <label key={i} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        checked={
                          points.find((p) => p.questionID === question.id)
                            ?.selected === option
                        }
                        onChange={() => handleSelectOption(question.id, i)}
                      />
                      {String.fromCharCode(65 + i)}. {option}
                    </label>
                  ))}
                </div>
              ))}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      )}
      {modal && (
        <div className="modal-overlay">
        <div className="modal">
          <p>Are you sure you want to delete this quiz?</p>
          <button
            onClick={() => {
              setModal(false);
              setDeleted("");
            }}
          >
            No
          </button>
          <button onClick={() => handleDelete(deleted)}>Yes</button>
        </div>
        </div>
      )}
    </div>
  );
}
