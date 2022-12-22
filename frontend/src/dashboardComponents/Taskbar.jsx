import React,{useState} from 'react'
import TaskView from '../dashboardComponents/TaskView'

function Taskbar(props) {
  const [obj,setObj]=useState('');
  const getView=(id)=>{
    
    props.todo && props.todo.forEach(element => {
      if(element._id===id)
      {
       setObj({element})
      }
    })
  }

  console.log("clicked obj=",obj);
 

  if(props)
  {
  return (
    <div className="w-4/5 flex flex-row">
    <div className="w-1/3 border-r-2 border-[#D3D3D3] h-[90vh] flex flex-col items-center">
  
  {
    props.todo && props.todo.map(element => {
        return(
          <div onClick={()=>getView(element._id)} key={element._id} style={{"cursor":"pointer"}} className="border-2 border-[#D3D3D3] w-full p-2 shadow-xl rounded-md mb-1"><h3>{element.title}</h3></div>
        )
  })
     }
        
     
      
      
    </div>
    <TaskView  userId={props.userId}  clickedObj={obj} loadData={props.loadData}/>
    </div>
  )
  }
else{
      return(
        <h1>loading....</h1>
      );
    }
}

export default Taskbar
