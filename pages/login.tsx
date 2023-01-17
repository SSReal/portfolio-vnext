import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import loader from "../public/loader.gif";


function Login() {
    const [{ username, password }, setRegDetails] = useState({ username: "", password: "" })
    const [loggedInUser, setLoggedInUser] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || "")
    }, [])

    function logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('loggedInUser');
        setLoggedInUser("");
    }

    function changeHandler(e: any) {
        if (e.target.name === "username") {
            setRegDetails({
                username: e.target.value,
                password,
            })
        }
        else if (e.target.name === "password") {
            setRegDetails({
                username,
                password: e.target.value,
            })
        }
    }

    async function login() {
        setLoading(true);
        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });
        const jsonRes = await res.json();
        if (!jsonRes.success) {
            alert("Login failed, check your details and try again")
            return;
        }
        const token = jsonRes.token;

        localStorage.setItem("userToken", token);
        localStorage.setItem("loggedInUser", username);

        alert(`Successfully logged in as ${username}`)
        await router.push('/edit');

        setLoading(false);
        setRegDetails({
            username: "",
            password: "",
        })
    }

    if (loggedInUser !== "") {
        //a user is already logged in
        //display logout button
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center mx-auto">
                <FaUserAlt className = "text-9xl"/>
                <p className = "text-5xl my-5">{loggedInUser}</p>
                <button className = "mt-10" onClick={logout}>Log out</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center">
            {loading
                && <div className="fixed bg-opacity-40 bg-slate-600 font-semibold w-screen h-screen flex items-center">
                    <Image className="mx-auto opacity-60" src={loader} alt="loading" />
                </div>
            }
            <div className="rounded-lg border-black border-2 p-10 text-2xl grid grid-cols-2 max-w-xl mx-auto my-auto">
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" value={username} onChange={changeHandler} />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" value={password} onChange={changeHandler} />
                <button className="my-5 mx-5 col-start-2" onClick={login}>Login</button>
                <Link href="/register" className="hover:scale-105 hover:bg-opacity-10 hover:bg-gray-600 border-2 border-gray-200 rounded-lg text-center py-2 mx-5 col-start-2">Sign up</Link>
            </div>

        </div>
    )
}

export default Login;