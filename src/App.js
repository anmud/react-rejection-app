import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [questions, setQuestions] = useState([
    {
      id: 1,        // id of the question so you can get/edit/remove by id
      questionBody: "How much is your salary?",    // the ask
      askee: "Ana Mo",       // person asked
      status: "rejected"       // 'Accepted', 'Rejected', 'Unanswered'
    },
    {
      id: 2,        // id of the question so you can get/edit/remove by id
      questionBody: "Would you take part in the project?",    // the ask
      askee: "Tom Nixon",       // person asked
      status: "accepted"       // 'Accepted', 'Rejected', 'Unanswered'
    }
  ])
  
 
  const [currentQuestion, setCurrentQuestion] = useState({id: null, questionBody: '', askee: '', status: ''})

  const handleInputChange = event => {
    const {name, value} = event.target
    setCurrentQuestion({...currentQuestion, [name]: value})
  }

  const acceptQuestion = ({currentQuestion, questions, setQuestions}) => {
    currentQuestion.id = questions.length + 1
    currentQuestion.status = "accepted"
    setQuestions([...questions, currentQuestion])
  }

  console.log(questions)

    return (
      <div className="App">
        <h2>Rejection app</h2>

{/* form to ask questions */}
        <form
        onSubmit={event => {
          event.preventDefault()
          if(!currentQuestion.questionBody || !currentQuestion.askee) return
          
          acceptQuestion({currentQuestion: currentQuestion, questions: questions, setQuestions: setQuestions})
          setCurrentQuestion({currentQuestion})
      }}
        >
      <label>Question </label>
      <input type="text" name="questionBody" value={currentQuestion.questionBody} onChange={handleInputChange}/>

      <label>Person you ask </label>
      <input type="text" name="askee"  value={currentQuestion.askee}  onChange={handleInputChange}/>

      <button type="submit">Accepted </button>

      <button>
        Rejected
      </button>
    </form>
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
    <p>You have N rejected questions</p>
    <p>You have N accepted questions</p>
      </div>
    );
  
}

export default App;
