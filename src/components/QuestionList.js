import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(data => setQuestionList((qList)=>[...qList, data]))
  },[])

  function deleteQuestion(questionId){
    fetch(`http://localhost:4000/questions/${questionId}`,{
      method: 'DELETE'
    })
    .then(r=>r.json())
    .then(()=>{
      const newList = questionList[0].filter((question => {return question.id !== parseInt(questionId)}))
      console.log(newList)
      setQuestionList([newList])    //replace list
      //window.location.reload()
    });     
    }

  function updateAnswer(answerId, answerValue){
    fetch(`http://localhost:4000/questions/${answerId}`,{
    method: 'PATCH',
    headers: {"content-type":"application/json"},
    body: JSON.stringify({"correctIndex": answerValue})
    })
    .then(r=>r.json())
    .then((data)=>{
      const updatedItems = questionList[0].map((question) => {
        if (question.id === data.id) {
          return data;
        } else {
          return question;
        }
      });
      setQuestionList([updatedItems]);
    });
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList.map(questions => questions.map(question => <QuestionItem key={question.id} question={question} onItemDelete={deleteQuestion} onAnswerChange={updateAnswer}/>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
