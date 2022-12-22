import axios from 'axios'
import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Popup({PopupFlag,closeBtn,clickedObj,loadData,reset}) {
  
  let todoId=clickedObj.element && clickedObj.element._id
  const [value,setValue]=useState({
    title: "",
    task: ""
  })
   
  // const title=clickedObj.element && clickedObj.element.title
  // const task=clickedObj.element && clickedObj.element.task[0]

  const UpdateTodo=async (e)=>{
    e.preventDefault()
    
    let title=value.title
    let task=value.task
  
    if(!(title))
    {
      console.log("if 1");
      title=clickedObj.element && clickedObj.element.title
    }
    if(!(task))
    {
      console.log("if 2");
      task=task=clickedObj.element && clickedObj.element.task[0]
    }

    try {
      const res=await axios.put(`http://localhost:4000/update/${todoId}`,{title: title, task: task})
      console.log("update res backend",res);
      loadData();
      reset();
      toast.success("Todo updated successfully !", {
        position: toast.POSITION.TOP_LEFT
      });
    } catch (error) {
      console.log(error);
    }

    console.log("title",value.title);
    console.log("task",value.task);
    closeBtn();
  }
  
 


  

  return (
    <div className={`${!PopupFlag? "hidden" : "flex"}  justify-center`}>
      <div className="border border-black rounded-sm pl-2 py-4">
        <div>
          <h3>Title:</h3>
          <input defaultValue={clickedObj.element && clickedObj.element.title}  placeholder="write your title here..." className="border border-black rounded-sm" type="text" name="title"
          onChange={(e)=>{
              setValue({
              ...value,
              title: e.target.value
            })
           
          }} 
          />
        </div>
        <div>
          <h3>Task:</h3>
          <textarea defaultValue={clickedObj.element && clickedObj.element.task[0]} placeholder="write your task here..." className="border border-black rounded-sm"  name="task" rows="4" cols="25" 
           onChange={(e)=>{
            setValue({
              ...value,
              task: e.target.value
            })
          }}
          />
        </div>
        <button className="bg-myblue text-white px-2 py-1 rounded-md"
        onClick={UpdateTodo}
        >Updates Todo</button>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Popup