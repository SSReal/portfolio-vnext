import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


function Login() {
    const [{username, password}, setRegDetails] = useState({username:"", password:""})
    
    function changeHandler(e:any) {
        if(e.target.name === "username") {
            setRegDetails({
                username: e.target.value,
                password,
            })
        }
        else if(e.target.name === "password") {
            setRegDetails({
                username,
                password: e.target.value,
            })
        }
    }

    const router = useRouter();

    async function login() {
        const res = await fetch('/api/login', {
            method: "POST", 
            body: JSON.stringify({
                username, 
                password
            })
        });
        const jsonRes = await res.json();
        if(!jsonRes.success) {
            alert("Login failed, check your details and try again")
            return;
        }
        const token = jsonRes.token;

        localStorage.setItem("userToken", token);
        localStorage.setItem("loggedInUser", username);

        alert(`Successfully logged in as ${username}`)
        await router.push('/edit');

        setRegDetails({
            username:"",
            password:"",
        })
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center">
            <div className="rounded-lg border-black border-2 p-10 text-2xl grid grid-cols-2 max-w-xl mx-auto my-auto">
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" value = {username} onChange = {changeHandler}/>
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" value = {password} onChange = {changeHandler}/>
                <button className="my-5 mx-10 col-start-2" onClick={login}>Login</button>
                <Link href = "/register" className="hover:scale-105 hover:bg-opacity-10 hover:bg-gray-600 border-2 border-gray-200 rounded-lg text-center py-2 mx-10 col-start-2">Sign up</Link>
            </div>

        </div>
    )
}

export default Login;