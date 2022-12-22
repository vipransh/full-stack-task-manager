import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile(props) {
   const [todo,setTodo]=useState({
    title: "",
    task: ""
   })

  //  function to save new todo in backend database
  const createTodo=async (e)=>{
    e.preventDefault();

    const response=await axios.post(`http://localhost:4000/createTodo/${props.id}`,{title: todo.title, task: todo.task})
    console.log("on create response backend",response);
    props.loadData();
    notify();
    
  }

  const notify = () => {
    // toast("todo added successfully")
    toast.success("Todo added Successfully !", {
      position: toast.POSITION.TOP_CENTER
    });
  };


  return (
    <div className="w-1/5 border-r-2 border-[#D3D3D3] h-[90vh]">
      <div>
        <div className="flex flex-col items-center pt-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#A9A9A9]"><h1 className="text-2xl text-myblue">{props.name && props.name.charAt(0).toUpperCase()}</h1></div>
          <h1 className="mt-4 ">{props.name}</h1>
          <h3 >{props.email}</h3>
        </div>
      </div>
      <div className="mt-8 pl-4 pr-2">
      <div className="border border-black rounded-sm pl-2 py-4">
        <div>
          <h3>Title:</h3>
          <input placeholder="write your title here..." className="border border-black rounded-sm" type="text" name="title" onChange={(e)=>{
            setTodo({
              ...todo,
              title: e.target.value
            })
          }}/>
        </div>
        <div>
          <h3>Task:</h3>
          <textarea placeholder="write your task here..." className="border border-black rounded-sm"  name="task" rows="4" cols="25" 
            onChange={(e)=>{
              setTodo({
                ...todo,
                task: e.target.value
              })
            }}
          />
        </div>
        <button className="bg-myblue text-white px-2 py-1 rounded-md"
        onClick={createTodo}
        >Create Todo</button>
        <ToastContainer />
      </div>
      </div>
    </div>
  )
}

export default Profile