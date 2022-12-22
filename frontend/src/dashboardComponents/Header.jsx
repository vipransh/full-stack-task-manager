import React,{useState} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'

function Header({searchShow}) {
  const navigate=useNavigate()
  const [searchKey, setSearchKey]=useState();

  const searchTodos=async(e)=>{
    e.preventDefault();
     searchShow(searchKey);
  }

  // logout function
  async function logout(){
    try {
      await account.deleteSession("current")
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex flex-row border-b-2 border-[#D3D3D3] h-14 items-center'>
        <div className="w-1/5 border-r-2 border-[#D3D3D3] h-full flex items-center justify-center">
            <h1 className="text-[#808080] md:text-xl">Task Manager</h1>
        </div>
        <div className="flex flex-row items-center w-1/4  md:pl-6 h-full">
            <input className="md:mr-2 md:text-xl w-full bg-[edfcfe]" type={'search'} placeholder="Search..." onChange={(e)=>{
              setSearchKey(e.target.value)
            }} ></input>
            <img onClick={searchTodos} className="w-6" alt="search-icon" style={{"cursor":"pointer"}} src="https://img.icons8.com/search"/>
        </div>
        <div className="w-1/2 flex items-center justify-end">
            <button onClick={logout} className="text-white bg-gradient-to-r from-myblue via-blue-600 to-myblue hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center">Logout</button>
        </div>
    </div>
  )
}

export default Header