import { useState } from "react";
import "./Login.css";
import LoggedIn from "../components/LoggedIn";
import { register } from "../utils/auth.js"
export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    if (localStorage.getItem("userjwt")) return <LoggedIn />

    const handleInputChange = (e,setState) => {
        setState(e.target.value)
        setErrorMessage("")
    }

    const handleSubmitButton = () => {
        if (!username || !password || !rePassword) {
            setErrorMessage("Empty Fields")
            return
        }
        if (password !== rePassword) {
            setErrorMessage("Passwords Do Not Match")
            return
        }
        register(username, password, setErrorMessage)
        // fetch("http://localhost:5500/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // }).then(data=>data.json()).then((json)=>{
        //     if (json.error) {
        //         setErrorMessage(json.data.msg)
        //         return
        //     }
        //     localStorage.setItem("userjwt", json.data.jwt)
        //     window.location.href = "/"
        // })
    } 


    return (
        <div className="login">
            <div className="login--modal">
                <div className="login--title">Register</div>
                <div className="login--error">{errorMessage}</div>
                <div className="login--subtitle">Username</div>
                <input onChange={(e)=>handleInputChange(e,setUsername)} type="text" placeholder="username" />
                <div className="login--subtitle">Password</div>
                <input onChange={(e)=>handleInputChange(e,setPassword)} type="password" placeholder="password" />
                <div className="login--subtitle">Re-Enter Password</div>
                <input onChange={(e)=>handleInputChange(e,setRePassword)} type="password" name="" id="" placeholder="re-enter password" />
                <button onClick={handleSubmitButton} className="login--submit">Create Account</button>
                <a className="login--redirect" href="/login">
                    Already Have An Account?
                </a>
            </div>
        </div>
    );
}
