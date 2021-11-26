import React from "react";
import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import ReactDateTimePicker from "react-datepicker";

function App() {
  const[showAddtasks,setShowAddTask]=useState(false)

  const[tasks,setTasks]=useState([])

  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

  // fetch tasks
  const fetchTasks=async()=>{
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }

//Add task
const addTask=(task)=>{
  const id=Math.floor(Math.random()*10000)+1
  const newTask = {id,...task}
  setTasks([...tasks,newTask])  
  // console.log(task)
}


//delete task
const deleteTask=async(id)=>{
await fetch('http://localhost:3000/tasks/${id}',
{
  method: 'DELETE',
})
  // console.log('delete',id)
  setTasks(tasks.filter((task)=>task.id !==id))
}

//toggle reminder
const toggleReminder = (id)=>{
  // console.log(id)
  setTasks(tasks.map((task)=> task.id==id 
  ? {...task,reminder: !task.reminder} 
  : task))
}

  // const name = 'Hemant'
  // const x = true
  return (
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

    </div>
    
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }

// }

export default App;
