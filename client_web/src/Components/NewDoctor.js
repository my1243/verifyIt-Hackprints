import { useState } from "react";

const NewDoctor = () => {
    const [doctor,setDoctor] = useState({
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        post:"",
        education:"",
        ig:"",
        ln:""
    })
let name,value;
    const handleInputs = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setDoctor({...doctor,[name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        try{
            const {fname, lname, email,mobile,post,education,ig,ln} = doctor;
            const res = await fetch("/doctsignup", {
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({fname, lname, email,mobile,post,education,ig,ln})
            })

            const data = await res.json();
            if(res.status===422 || !data){
                console.log("Error");
            }else{
                console.log("Success");
            }
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <div className="mx-4 mt-4 w-full">
        <div>
          <h1 className="text-4xl font-semibold my-2">Register New Doctor...</h1>
          <div className="h-2 bg-neutral-800 rounded-full w-[32rem]"></div>
        </div>
        <div>
          <form className="mx-4 my-8">
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Profile Photo
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"file"}
                accept={"image/*"}
                name="profile"
                placeholder="profile"
              />
            </div>
            <div className="mb-4 flex flex-col w-full sm:flex-row items-start sm:items-center">
              <div className="w-1/3 text-lg">Name</div>
              <div className="flex flex-row w-full sm:w-2/3">
                <input
                  className=" p-2 w-full sm:w-2/3 mr-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="fname"
                  id="fname"
                  value={doctor.fname}
                  onChange={handleInputs}
                  placeholder="First Name"
                />
                <input
                  className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="lname"
                  id="lname"
                  value={doctor.lname}
                  onChange={handleInputs}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Email Address
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"email"}
                name="email"
                id="email"
                value={doctor.email}
                onChange={handleInputs}
                placeholder="Email Address"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Contact No
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="mobile"
                id="mobile"
                value={doctor.mobile}
                onChange={handleInputs}
                placeholder="Mobile No"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Education
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="education"
                id="education"
                value={doctor.education}
                onChange={handleInputs}
                placeholder="Highest degree obtained"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Doctor's post at hospital
              </label>
              <input
                className="w-full sm:w-2/3 p-2 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="post"
                id="post"
                value={doctor.post}
                onChange={handleInputs}
                placeholder="Designation"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Instagram Account
              </label>
              <input
                className="w-full sm:w-2/3 p-2 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"url"}
                name="ig"
                id="ig"
                value={doctor.ig}
                onChange={handleInputs}
                placeholder="Instagram profile link"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                LinkedIn Account
              </label>
              <input
                className="w-full sm:w-2/3 p-2 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"url"}
                name="ln"
                id="ln"
                value={doctor.ln}
                onChange={handleInputs}
                placeholder="LinkedIn profile link"
              />
            </div>
            
            <div className="flex justify-center">
              <button
                className="w-1/3 bg-black text-white font-bold uppercase py-2 px-6 rounded-lg hover:bg-red-500 hover:text-black"
                 onClick={postData}
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDoctor;
