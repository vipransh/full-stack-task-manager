import React,{useState} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

function Signup() {

    const navigate=useNavigate();
    const [user,setUser]=useState({
        name: "",
        email: "",
        password: ""
    })
        // SignUp function
        const signUpUser=async (e)=>{
            e.preventDefault();

            const promise=account.create(
                uuidv4(),
                user.email,
                user.password,
                user.name
            );
            promise.then(
                function(response){
                    console.log(response);
                    navigate("/") //success
                    CreateUserInBackend(response);
                },
                function(error){
                    console.log(error);
                }
             );   
        
        }

     async function CreateUserInBackend(response){
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
          };
      
                    const user=await axios.post('http://localhost:4000/signUp',{appwriteUserId: response.$id,name: response.name,email: response.email},config);
                    console.log("from backend", user);
     }


  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        placeholder="Full Name"
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                name: e.target.value
                            })
                        }} />
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }}
                        />
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                password: e.target.value
                            })
                        }}
                        />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-myblue text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={signUpUser}
                    >Create Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="/signup">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="/signup">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
  )
}

export default Signup