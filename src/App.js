import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
// import About from "./components/About";
// import ReactDateTimePicker from "react-datepicker";
import { Auth0Provider } from "@auth0/auth0-react"
import LoginButton from "./components/LoginButton";


function App() {
  const[showAddtasks,setShowAddTask]=useState(false)

  const[tasks,setTasks]=useState([])

  

  useEffect(()=>{
   const getTasks=async()=>{
     const tasksFromServer=await fetchTasks()
     setTasks(tasksFromServer)
   }

    getTasks()
  },[])
    
  const API='http://localhost:5000/'
// fetch data
  const fetchTasks=async()=>{

    
    const res = await fetch(API)
    const data = await res.json()
    console.log(data)
    return data
  }

  const fetchTask=async(id)=>{
    const res = await fetch(API+id)
    const data = await res.json()
    // console.log(data)
    return data
  }
  

//Add task
const data=null
const addTask=async(task)=>{
  const res = {
  method: 'POST',
  headers:{'Content-type':'application/json'},
  body:JSON.stringify(task)  
};
fetch(API+'addtask',res)
.then(data=await res.json())
.then(setTasks([...tasks, data]))
}


//delete task
const deleteTask=async(id)=>{
await fetch('https://polar-badlands-57668.herokuapp.com/tasks/'+id,
{
  method: 'DELETE',
})
  // console.log('delete',id)
  setTasks(tasks.filter((task)=>task.id !==id))
}

//toggle reminder
const toggleReminder =async (id)=>{
const taskToToggle=await fetchTask(id)
const updTask={...taskToToggle,reminder: !taskToToggle.reminder}

const res = await fetch('https://polar-badlands-57668.herokuapp.com/tasks/'+id,
{
  method: 'PUT',
  headers:{
    'Content-type':'application/json'
  },
  body:JSON.stringify(updTask)
})

const data= await res.json()

  // console.log(id)
  setTasks(tasks.map((task)=> task.id===id 
  ? {...task,reminder: data.reminder} 
  : task))
}

  // const name = 'Hemant'
  // const x = true
  return (
    <Auth0Provider
    domain="hemantbwskar.us.auth0.com"
    clientId="mAmNxt8didKYDLL3EtS2eRVxamkhGlKl"
    redirectUri={window.location.origin}
  >
    
    <Router>
    <div className='container'>
      <LoginButton />
     <Header onAdd={()=>setShowAddTask(!showAddtasks)}
     showAdd={showAddtasks}
    //  title='Task Tracker'
    />
     {showAddtasks && <AddTask onAdd={addTask}/>}
     {tasks.length >0 ? (<Tasks tasks={tasks} onDelete=
     {deleteTask} onToggle={toggleReminder}/>
     ) : (
       'No task to do.'
       )}
       {/* <Routes><Route path='/' exact render={(props)
         =>(
         <>
         </>
       )}/> */}
       {/* <Route path='/about' component={About}/></Routes> */}
      <Footer/>
    </div>
    </Router>
    </Auth0Provider>
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }

// }

export default App;
