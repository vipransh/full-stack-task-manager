import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Header from '../dashboardComponents/Header'
import Profile from '../dashboardComponents/Profile'
import Taskbar from '../dashboardComponents/Taskbar'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'




function Dashboard() {
  const navigate=useNavigate()
  const [todo,setTodo]=useState()
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [id,setId]=useState()
  

  useEffect(()=>{
    loadData();
},[]);

   function loadData(){
    console.log("entered in useEffect");
    const getData=account.get()
    getData.then(
        async function(response){
          // console.log("response",response);
            if(response.name)
            {
              const appwriteId=response.$id;
              // console.log("appwriteId=",appwriteId);
              const {data}=await axios.get(`http://localhost:4000/getUser/${appwriteId}`)
              console.log("user backend res",data);
              setName(data.user[0].name);
              setEmail(data.user[0].email)
              setTodo(data.user[0]?.todo);
              setId(data.user[0]?._id);
            }
            else
            {
              navigate("/")
            }
            
        },
        function(error){
            console.log(error);
        }
    )
   }

// console.log("dashboard",name);
  async function searchShow(key){
    console.log("searched data=",key);

    if(!(key))
    {
      loadData()
    }
    else
    {
     const {data}=await axios.get(`http://localhost:4000/search/${id}/${key}`)
     console.log("search data from backend",data.searchResult);
     setTodo(data.searchResult)
    }
   }

  


  return (
    <div className="flex flex-col bg-[#edf7fe]">
      <div>
        <Header searchShow={searchShow}/>
      </div>
      <div className="flex flex-row">
        <Profile name={name} email={email} id={id} loadData={loadData}/>
        <Taskbar todo={todo} userId={id} loadData={loadData} />
        
      </div>
    </div>
  )
}

export default Dashboard