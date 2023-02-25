import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
  } from "react-router-dom";
import Slidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import AddStudent from "./Components/AddStudent";
import AddFaculty from "./Components/AddFaculty";
import AssignBlock from "./Components/AssignBlock";
import { useState } from "react";
import Login from "./Components/Login";
import Home1 from "./Components/Home";

  const App = () => {
    const [doct,setDoct] = useState({});
    const [flag,setFlag] = useState(false);
    // const [isLogin, setisLogin] = useState(false);
    return(
        <>
            <Router>
                <Routes>
                    <Route element={
                        <>
                        <div className="flex">
                            <Slidebar/>
                            <Outlet/>
                        </div>
                        </>
                    }>
                        <Route path="/home" element={<Home1/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/addstudent" element={<AddStudent/>}/>
                        <Route path="/addfaculty" element={<AddFaculty/>}/>
                        <Route path="/assignblock" element={<AssignBlock/>}/>
                    </Route>
                    <Route path="/" element={<Login/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;