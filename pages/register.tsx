import Link from "next/link";
import { useMemo, useState } from "react";


function Register() {
    const [{username, password, cpassword}, setRegDetails] = useState({username:"", password:"", cpassword:""})
    
    function changeHandler(e:any) {
        if(e.target.name === "username") {
            setRegDetails({
                username: e.target.value,
                password,
                cpassword
            })
        }
        else if(e.target.name === "password") {
            setRegDetails({
                username,
                password: e.target.value,
                cpassword
            })
        }
        else if(e.target.name === "cpassword") {
            setRegDetails({
                username,
                password,
                cpassword: e.target.value
            })
        }
    }

    async function regUser() {

        const res1 = await fetch('/api/find', {
            method: "POST", 
            body: JSON.stringify({username})
        })
        
        const {found} = await res1.json();

        if(found) {
            alert("The provided username already exists, please try another one");
            return;
        }

        if(cpassword !== password) {
            alert("The passwords don't match, please check and try again");
            return;
        }

        const res2 = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        })

        console.log(res2);
        setRegDetails({username:"", password:"", cpassword: ""})

    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center">
            <div className="rounded-lg border-black border-2 p-10 text-2xl grid grid-cols-2 max-w-xl mx-auto my-auto">
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" value = {username} onChange = {changeHandler}/>
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" value = {password} onChange = {changeHandler}/>
                <label htmlFor="cpassword">Confirm Password: </label>
                <input name="cpassword" type="password" value = {cpassword} onChange = {changeHandler}/>
                <button className="my-5 mx-10 col-start-2" onClick={regUser}>Sign up</button>
                <Link href = "/login" className="hover:scale-105 hover:bg-opacity-10 hover:bg-gray-600 border-2 border-gray-200 rounded-lg text-center py-2 mx-10 col-start-2">Login</Link>
            </div>

        </div>
    )
}

export default Register;