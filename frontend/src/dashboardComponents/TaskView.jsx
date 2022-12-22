import React,{useState} from 'react'
import editicon from '../assets/editicon.png'
import deleteicon from '../assets/deleteicon.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from '../components/Popup'

function TaskView({clickedObj,userId,loadData}) {

  const [PopupFlag,setPopupFlag]=useState(false)
  
  // function to delete a todo from database
  const removeTodo=async()=>{
    const res=await axios.delete(`http://localhost:4000/deleteTodo/${userId}/${clickedObj.element._id}`)
    loadData();
    reset();
    toast.success("Todo deleted !", {
      position: toast.POSITION.TOP_LEFT
    });
    console.log("delete response",res);
    console.log("dl userId", userId);
    console.log("dl todo id",clickedObj.element && clickedObj.element._id);
  }

  function reset(){
    clickedObj.element=""
  }

  // edit button onclick
  const handleEditButtonClick=()=>{
    setPopupFlag((PopupFlag)=>!PopupFlag)
   }

  return (
    <div className="w-8/12">
      <div className="flex flex-row items-center w-full px-2 border-b-2 border-[#D3D3D3]">
        <div className="w-4/5"><h1>{clickedObj.element && clickedObj.element.title}</h1></div>
        <div className="flex flex-row w-1/5">
        <img onClick={handleEditButtonClick} className="w-8 h-8" alt="edit-button-icon" style={{"cursor":"pointer"}} src={editicon}/>
        <img onClick={removeTodo} className="w-8 h-8" alt="delete-button-icon" style={{"cursor":"pointer"}} src={deleteicon}/>
        </div>
      </div>
    <div className="p-4">
      <p>{clickedObj.element && clickedObj.element.task[0]}</p>
    </div>
    <Popup PopupFlag={PopupFlag} closeBtn={handleEditButtonClick} clickedObj={clickedObj} loadData={loadData} reset={reset}/>
    <ToastContainer/>
    </div>
  )
}

export default TaskView