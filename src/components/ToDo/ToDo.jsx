import React, { useState } from 'react'
import {todos as todoDB} from '../../db/todos';
export default function ToDo() {
    const [tasks, setTasks]=useState(todoDB);
    const [input, setInput]=useState({
        id: null,
      task: "",
      priority: "",
      status: ""
    });
    const [edit, setEdit]=useState(false);
    const [editTask, setEditTask]=useState({});
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!input.priority||!input.task.trim()){
            alert("Please fill");
            return;
        }
        const newInput={...input, id:Date.now(), status: "Incomplete"};
        setTasks((prev)=>[...prev, newInput]);
        setInput({ id: null, task: "", priority: "", status: "" });
    }
    const handleDelete=(index)=>{
        const newTask=tasks.filter((task)=>task.id!==index);
        setTasks(newTask);
    }
    const handleChange=(e, prop)=>{
        const newInput={...input, [prop]: e.target.value};
        setInput(newInput);
    }
    const handleChangeEdit=(e, prop)=>{
        const newInput={...editTask, [prop]: e.target.value};
        setEditTask(newInput);
    }
    const handleEdit=(id)=>{
        setEdit(true);
        const foundTask=tasks.find((task)=>task.id===id);
        setEditTask(foundTask);
    }
    const handleSubmitEdit=(e,id)=>{
        e.preventDefault();
        if(!editTask.priority||!editTask.task.trim()){
            alert("Please fill");
            return;
        }
        const newTasks=tasks.map((task)=>task.id===id? editTask : task);
        setTasks(newTasks);
        setEdit(false);
        setEditTask({});
    }
    const handleCheck=(id)=>{
        const newTasks=tasks.map((task)=>task.id===id? {...task, status: task.status==="Incomplete"? "Finished" : "Incomplete"}: task);
        setTasks(newTasks);
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Add Task' value={input.task} onChange={(e)=>handleChange(e,"task")}></input>
        <select name="priority" value={input.priority} onChange={(e)=>handleChange(e,"priority")}>
        <option value="" selected disabled hidden>Choose here</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <input type='submit' value='+'></input>
    </form>
    <div>
        {tasks.map((task, i)=>(
            <div key={task.id} >
                <div style={{display: 'flex', gap: '20px', textDecoration: task.status==="Incomplete"?  "none" : "line-through"}}>
                <input type="checkbox" onClick={()=>handleCheck(task.id)}></input>
                 <p>name: {task.task}</p>
                 <p>P: {task.priority}</p>
                 </div>
                 <button onClick={()=>handleDelete(task.id)}>Delete</button>
                 <button onClick={()=>handleEdit(task.id)}>Edit</button>
            </div>
        ))}
        {edit?(
          <>
          <form onSubmit={(e)=>handleSubmitEdit(e,editTask.id)}>
          <input type='text' value={editTask.task} onChange={(e)=>handleChangeEdit(e,"task")}></input>
        <select name="priority" value={editTask.priority} onChange={(e)=>handleChangeEdit(e,"priority")}>
        <option value="" selected disabled hidden>Choose here</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <input type='submit' value='Update'></input>
          </form>
          </>
        ):(
          <>
          </>
        )
        }
    </div>
    </>
  )
}
