import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Slidebar = () => {
  let commonClass =
    "inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border-none rounded-lg text-neutral-200 focus:bg-neutral-900 focus:border-neutral-900 focus:shadow-outline";

    const [user,setUser] = useState({});
    const authenticate = async () => {
        try{
            const res = await fetch("/alogged", {
                method:"GET",
                headers:{
                    "Content-Type":"Application/json",
                    "Accept": "Application/json"
                },
                // body:JSON.stringify({type:"Admin"}),
                credentials:"include",
            });
    
            const data = await res.json();
            if(data){
                setUser(data);
            }
            if(res.status === 400){
                // return res.status;
                throw new Error("admin credentials not matched");
            }
        }catch(err){
            console.log(err);
            window.location = "/connect-admin";
        }
    }

    const logoutfn = async () => {
        try{
            const res = await fetch("/logout", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json"
                },
                credentials:"include"
            })
            if(res.status === 200){
                // alert.success("Logout");
                window.location="/connect-admin";
            }else{
                alert.error("logout failed");
            }
        }catch(err){
            console.log(err);
        }
      }

    // useEffect(() => {
        // authenticate();
    // },[]);
  return (
    <>
    {user? 
      <div className="w-64 h-screen shadow hidden lg:block bg-white">
        <div className="flex flex-col md:flex md:flex-shrink-0">
          <div className="flex flex-col md:w-64 md:h-screen">
            <div className="flex flex-col flex-grow md:pt-5 overflow-y-auto border-r bg-neutral-800">
              <div className="flex flex-col flex-grow px-4 mt-5">
                <nav className="flex-1 space-y-1 bg-neutral-800">
                  <ul
                    className={
                      "md:flex md:flex-col md:w-60 bg-inherit w-64 h-full md:h-auto pl-4 md:pb-0 pb-12 absolute md:z-auto z[-50]  right-0 md:left-0"
                    }
                  >
                    <li>
                        <Link to="/home" className="inline-flex items-center w-full px-4 py-2 text-neutral-200 text-xl font-bold">Admin Console</Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/dashboard"}
                      >
                        <i class="fa-regular fa-calendar-check"></i>
                        <span className="ml-4">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/addstudent"}
                      >
                      <i class="fa-solid fa-user-doctor"></i>
                        <span className="ml-4">New Student</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/addfaculty"}
                      >
                        <i class="fa-regular fa-calendar-check"></i>
                        <span className="ml-4">New Faculty</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/AssignBlock"}
                      >
                        <i class="fa-regular fa-user"></i>
                        <span className="ml-4">Assign Block</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="hidden md:flex md:flex-shrink-0 md:p-4 md:bg-neutral-900 flex-col gap-y-2">
              <button
                        className="inline-flex items-center w-full hover:bg-neutral-800 px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform rounded-lg text-neutral-200 focus:shadow-outline"
                        onClick={logoutfn}
                      >
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span className="ml-4">Logout</span>
                      </button>
                <Link to={"/"} className="flex-shrink-0 block w-full border-t-2 border-gray-500 pt-4">
                  <div className="flex items-center ml-2">
                    <div>
                      <img
                        className="inline-block rounded-full h-9 w-9"
                        src="/images/avatar.jpg"
                        alt="logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-200">
                        TrackIt
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>: <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> }
    </>
  );
}

export default Slidebar;