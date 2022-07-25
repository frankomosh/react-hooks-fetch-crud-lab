import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {

  const [quizes, setQuiz] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then((quizes) => setQuiz(quizes))
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = quizes.filter((q) => q.id !== id);
        setQuiz(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = quizes.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuiz(updatedQuestions);
      });
  }
  const displayQuestions = quizes.map((quiz) => {
    return (
      <QuestionItem 
        key={quiz.id}
        question={quiz}
        onDeleteClick={handleDeleteClick}
         onAnswerChange={handleAnswerChange}
      />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <QuestionForm onAddQuiz={handleAddItem} /> */}
      <ul>
        {displayQuestions}
        {/* <QuestionItem key={quizes.id} question={quizes} /> */}
      </ul>
    </section>
  );
}

export default QuestionList;

