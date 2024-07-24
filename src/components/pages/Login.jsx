import React from 'react'
import { useState, useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import AuthContext from '../../context/AuthContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {showAndHide} = useContext(EcomContext);
    const [state, dispatch] = useContext(AuthContext)
    const {setItem} = useLocalStorage("auth-token")

    const redirect = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (data === "invalid email/password") {
                showAndHide("error", "invalid email/password")
            } else {
                dispatch({ type: "setToken", payload: data.token });
                setItem(data.token);
                redirect("/");
                showAndHide("success", "login successfull!!!")
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <div className='my-[5%] mx-[30%] '>
        <h1 className="text-center mb-[10px] text-2xl font-bold">Login</h1>
            <form onSubmit={loginHandler}>
                <div className="mb-3">
                    <input type="email" placeholder='Email-Address' onChange={(e) => setEmail(e.target.value)} className='w-full p-[10px] border-b-[1px] shadow-sm border-stone-500'/>
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='w-full p-[10px] border-b-[1px] shadow-sm border-stone-500'/>
                </div>
                <div className='my-[3%]'>
                    <button className="bg-blue-950 p-[10px] text-white rounded-lg">Login</button>
                </div>
            </form>
    </div>
  )
}

export default Login