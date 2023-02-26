import { useState } from "react";

const AddFaculty = () => {
    const [Faculty,setFaculty] = useState({
        fId:"",
        fname:"",
        lname:"",
        fShortName:"",
        branch:"",
    })
let name,value;
    const handleInputs = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setFaculty({...Faculty,[name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        try{
            const {fId, fname,lname, fShortName, branch} = Faculty;
            const res = await fetch("/doctsignup", {
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({fId, fname,lname,fShortName, branch})
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
      <div className="mx-4 mt-4 w-full relative">
        <div>
          <h1 className="text-4xl font-semibold my-2">Register New Faculty...</h1>
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
                  value={Faculty.fname}
                  onChange={handleInputs}
                  placeholder="First Name"
                />
                <input
                  className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="lname"
                  id="lname"
                  value={Faculty.lname}
                  onChange={handleInputs}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Faculty Short Name
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="fShortName"
                id="fShortName"
                value={Faculty.fShortName}
                onChange={handleInputs}
                placeholder="Faculty Short Name"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Branch
              </label>
              <select
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"                
                name="branch"
                id="branch"
                value={Faculty.branch}
                onChange={handleInputs}
              >
              <option value={"Select an option"}>Select an option</option>
              <option value={"CE"}>CE</option>
              <option value={"IT"}>IT</option>
              <option value={"MH"}>MH</option>
              <option value={"CH"}>CH</option>
              <option value={"EC"}>EC</option>
              <option value={"IC"}>IC</option>
              <option value={"CL"}>CL</option>
              <option value={"BDS"}>BDS</option>
                </select>
            </div>
            <div className="flex justify-center">
              <button
                className="w-1/3 bg-black text-white font-bold uppercase py-2 px-6 rounded-lg hover:bg-red-500 hover:text-black"
                 onClick={postData}
              >
                Add Faculty
              </button>
            </div>
          </form>
        </div>
        <div className="bg-neutral-900 rounded-full shadow-lg hover:scale-110 cursor-pointer py-2 px-4 text-white absolute bottom-6 right-6 z-50">Import Faculty</div>

      </div>
    </>
  );
}

export default AddFaculty;