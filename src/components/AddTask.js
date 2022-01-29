import { useState } from "react"

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

const AddTask = ({onAdd}) => {
    const [text,setText]=useState('')
    const [day,setDay]=useState(new Date())
    const [reminder,setReminder]=useState(false)

    const onSubmit =(e)=>{
        e.preventDefault()
    
        if(!text){
            alert('Plase add a task')
            return
        }
    
        onAdd({text,day,reminder});
    
        setText('')
        setDay(day)
        setReminder(false)
    }

    return (


        
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <lable>Task</lable>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <lable>Day and Time</lable>
                
                <DateTimePicker
                            selected={day} 
                            value={day}
                            onChange={(e) => setDay(e)} 
                            dateFormat="Pp"
                />
                {/* <input type='text' placeholder='Add Day and Time' value={day} onChange={(e) => setDay(e.target.value)}/> */}
            </div>
            <div className='form-control form-control-check'>
                <lable>Set Reminder</lable>
                <input type='checkbox' checked={reminder}value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
