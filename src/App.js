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

  const [editing, setEditing] = useState(false)

  const [point, setPoint] = useState(0)

  const editRow = question => {
    setEditing(true)
    setCurrentQuestion({...currentQuestion, id: question.id, questionBody: question.questionBody, askee: question.askee, status: question.status})
  }

  const updateQuestion = ({id, updatedQuestion, questions, setQuestions}) => {
    setEditing(false)
    setQuestions(questions.map(question => (question.id === id ? updatedQuestion : question)))
  }
  
  
  const handleQuestion = event => {
    const {name, value} = event.target
    setCurrentQuestion({...currentQuestion, [name]: value})
  }

  const handleUpdatedQuestion = event => {
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

 
 const deleteQuestion = ({questions, id}) =>{
 const newQuestions = questions.filter(question => question.id !== id)
 return setQuestions(newQuestions)
 }

 const countQuestionStatus = questions.reduce((acc, {status})=> {
      acc[status] = (acc[status] || 0) + 1
      return acc
      }, {})


  const countPoints = ({questions, setPoint}) => {
    const newPoints = questions.reduce((acc, {status}) => {
        (status === "rejected") ? acc.push(10) : acc.push(1)
        console.log("points acc", acc)
        return acc
    }, [])
    return countSum({newPoints: newPoints, setPoint: setPoint})
  }

  const countSum = ({newPoints, setPoint}) => {
    const result = newPoints.reduce((acc, item) => acc + item)
    return setPoint(result)
  }

    return (
      <div className="App">
        <h2>Rejection app</h2>

   <div>
     {editing ? (
       <div>
       <form
       onSubmit={event => {
         event.preventDefault()
 
         updateQuestion({id: currentQuestion.id, updatedQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})
       }}
       >
       <label>Status </label>
       <input type="text" name="status" value={currentQuestion.status} onChange={handleUpdatedQuestion} />
 
       <button>Update question</button>
 
       <button onClick={() => setEditing(false)}>Cancel</button>
     </form>
          </div>
     ) : (
       <div>
      <label>Question </label>
      <input type="text" name="questionBody" value={currentQuestion.questionBody} onChange={handleQuestion}/>

      <label>Person you ask </label>
      <input type="text" name="askee"  value={currentQuestion.askee}  onChange={handleQuestion}/>

      <button onClick={()=> acceptQuestion({currentQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})}>Accept </button>

      <button onClick={()=>rejectQuestion({currentQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})}>
        Reject
      </button>
      </div>
     )}
   </div>
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
          <button onClick={()=>{editRow(question)}} >Edit</button>
          <button onClick={() => deleteQuestion({questions: questions, id: question.id})}>Delete</button>
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
    <p>You have  {countQuestionStatus.rejected || 0} rejected questions</p>
    <p>You have {countQuestionStatus.accepted || 0} accepted questions</p>


    <br/>
    <hr/>
    <br/>

    {/* points  */}
    <button onClick={() => countPoints({questions: questions, setPoint: setPoint})}>Show my points</button>
    <p>You have {point} points</p>
    
      </div>
    );
  
}

export default App;
