import React from "react";
import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const[tasks,setTasks]=useState(
    [
    {
    id:1,
    text: 'Doctors appointment',
    day: 'July 10th at 3:00pm',
    reminder: true
    },
    {
    id:2,
    text: 'Meeting',
    day: 'July 10th at 4:00pm',
    reminder: true
    },
    {
    id:3,
    text: 'Shopping',
    day: 'July 10th at 5:00pm',
    reminder: false
    },
]
)

//Add task
const addTask=(task)=>{
  const id=Math.floor(Math.random()*10000)+1
  const newTask = {id,...task}
  setTasks([...tasks,newTask])  
  // console.log(task)
}


//delete task
const deleteTask=(id)=>{
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
     <Header title='Task Tracker'/>
     <AddTask onAdd={addTask}/>
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
