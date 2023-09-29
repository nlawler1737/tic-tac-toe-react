import Navbar from "./components/Navbar";
import ClassicMode from "./pages/ClassicMode";
import SuperMode from "./pages/SuperMode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// import "../public/socket.io/socket.io.js"
// import { io } from "node_modules\socket.io\client-dist\socket.io.js"
// import { io }
// import { io } from "socket.io-client"
// import io from "../public/socket.io/socket.io.js"

function App() {
    // const socket = 
    // if (window.location.path === "/classic") {
    //     const socket = globalThis.io("http://localhost:5500", {auth:"test"})
    // }
    
    
    return (
        <>
            <Navbar />

            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/classic" element={<ClassicMode />}></Route>
                    <Route path="/super" element={<SuperMode />}></Route>
                    <Route path="/history" element={<History />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
