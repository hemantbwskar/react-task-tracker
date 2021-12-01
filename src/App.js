import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import ReactDateTimePicker from "react-datepicker";

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
    
// fetch data
  const fetchTasks=async()=>{
    const res = await fetch('https://polar-badlands-57668.herokuapp.com/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }

  const fetchTask=async(id)=>{
    const res = await fetch('https://polar-badlands-57668.herokuapp.com/tasks/'+id)
    const data = await res.json()
    // console.log(data)
    return data
  }
  

//Add task
const addTask=async(task)=>{
const res =await fetch('https://polar-badlands-57668.herokuapp.com/tasks',{
  method: 'POST',
  headers:{
    'Content-type':'application/json'
  },
  body:JSON.stringify(task)
})

const data=await res.json()

setTasks([...tasks, data])
  // const id=Math.floor(Math.random()*10000)+1

  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])  
  // console.log(task)
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
    <Router>
    <div className='container'>
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
    
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }

// }

export default App;
