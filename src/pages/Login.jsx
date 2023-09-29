import { useState } from "react";
import LoggedIn from "../components/LoggedIn"
import "./Login.css";
import { login } from "../utils/auth";
export default function Login() {

    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const [errorMessage, setErrorMessage] = useState("")

    if (localStorage.getItem("userjwt")) return <LoggedIn />

    const handleInputChange = (e,setState) => {
        setState(e.target.value)
        setErrorMessage("")
    }

    const handleSubmitButton = () => {
        if (!username || !password) {
            setErrorMessage("Empty Fields")
            return
        }
        console.log(username, password)
        login(username, password, setErrorMessage)
        // fetch("http://localhost:5500/authenticate", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // }).then(data=>data.json()).then((json)=>{
        //     console.log(json)
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
                <div className="login--title">Login</div>
                <div className="login--error">{errorMessage}</div>
                <div className="login--subtitle">Username</div>
                <input onChange={(e)=>handleInputChange(e,setUsername)} type="text" placeholder="username" />
                <div className="login--subtitle">Password</div>
                <input onChange={(e)=>handleInputChange(e,setPassword)} type="password" placeholder="password" />
                {/* <div className="login--subtitle">Re-Enter Password</div>
                <input onChange={(e)=>handleInputChange(e,setPassword)} type="password" name="" id="" placeholder="password" /> */}
                <button onClick={handleSubmitButton} className="login--submit">Login</button>
                <a className="login--redirect" href="/register">
                    Create An Account
                </a>
            </div>
        </div>
    );
}
