import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [questions, setQuestions] = useState([
    {
      id: 1,        
      questionBody: "How much is your salary?",    
      askee: "Ana Mo",      
      status: "rejected"      
    },
    {
      id: 2,        
      questionBody: "Would you take part in the project?",   
      askee: "Tom Nixon",      
      status: "accepted"       
    }
  ])
  
 
  const [currentQuestion, setCurrentQuestion] = useState({id: null, questionBody: '', askee: '', status: ''})


  const handleAcceptedQuestion = event => {
    const {name, value} = event.target
   setCurrentQuestion({...currentQuestion, [name]: value})
  }

  const acceptQuestion = ({currentQuestion, questions, setQuestions}) => {
   
    currentQuestion.id = questions.length + 1
    currentQuestion.status =  "accepted" 
    setQuestions([...questions, currentQuestion])
    
  }
  
  const rejectQuestion = ({currentQuestion, questions, setQuestions}) => {
  currentQuestion.id = questions.length + 1
  currentQuestion.status =  "rejected" 
  setQuestions([...questions, currentQuestion])
 
 }

 console.log("questions",questions)


 const countQuestionStatus = questions.reduce((acc, {status})=> {
      acc[status] = (acc[status] || 0) + 1
      console.log("acc",acc)
      return acc
      }, {})

   
    



  

    return (
      <div className="App">
        <h2>Rejection app</h2>


      <label>Question </label>
      <input type="text" name="questionBody" value={currentQuestion.questionBody} onChange={handleAcceptedQuestion}/>

      <label>Person you ask </label>
      <input type="text" name="askee"  value={currentQuestion.askee}  onChange={handleAcceptedQuestion}/>

      <button onClick={()=> acceptQuestion({currentQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})}>Accept </button>

      <button onClick={()=>rejectQuestion({currentQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})}>
        Reject
      </button>
   
    <br/>
    <hr/>
    <br/>

{/* list of questions */}
    <table>
    <thead>
      <tr >
        <th>Id</th>
        <th>Question</th>
        <th>Askee</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
          {questions.length > 0 ?
          (questions.map(question => (
      <tr key={question.id} >
        <td>{question.id}</td>
        <td>{question.questionBody}</td>
        <td>{question.askee}</td>
        <td>{question.status}</td>
        <td>
          <button >Edit</button>
          <button >Delete</button>
        </td>
      </tr>
          ))
          ) : (
        <tr>
        <td colSpan={3}>No questions</td>
      </tr>
          )}
    </tbody>
  </table>
    
    <br/>
    <hr/>
    <br/>

    {/* desired output */}
    <p>You have  {countQuestionStatus.rejected} rejected questions</p>
    <p>You have {countQuestionStatus.accepted} accepted questions</p>
    
      </div>
    );
  
}

export default App;
