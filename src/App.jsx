import ClassicMode from "./pages/ClassicMode";
import SuperMode from "./pages/SuperMode";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <>
            <Navbar />

            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/classic" element={<ClassicMode />}></Route>
                    <Route path="/super" element={<SuperMode />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
