import { useState } from "react";

const AddStudent = () => {
    const [Student,setStudent] = useState({
        img:"",
        fname:"",
        lname:"",
        rollNo:"",
        semester:0,
        clg:"",
        practicalExam:false,
        feeStatus:false
    })
let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudent({...Student,[name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        try{
            const {fname, lname, rollNo, semester, clg, practicalExam, feeStatus} = Student;
            const res = await fetch("/doctsignup", {
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({fname, lname, rollNo, semester, clg,practicalExam,feeStatus})
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
          <h1 className="text-4xl font-semibold my-2">Register New Student...</h1>
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
                name="img"
                value={Student.img}
                onChange={handleInputs}
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
                  value={Student.fname}
                  onChange={handleInputs}
                  placeholder="First Name"
                />
                <input
                  className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="lname"
                  id="lname"
                  value={Student.lname}
                  onChange={handleInputs}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Roll No
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="rollNo"
                id="rollNo"
                value={Student.rollNo}
                onChange={handleInputs}
                placeholder="Roll No"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Semester
              </label>
              <select
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="semester"
                id="semester"
                value={Student.semester}
                onChange={handleInputs}
              >
              <option value={"Select an option"}>select an option</option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
              </select>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                College Name
              </label>
              <input
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                type={"text"}
                name="clg"
                id="clg"
                value={Student.clg}
                onChange={handleInputs}
                placeholder="College Name"
              />
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Is practicalExam?
              </label>
              <div className="mr-6">
              <input
              className="mr-2"
                type={"radio"}
                name="practicalExam"
                value={true}
                onChange={handleInputs}
              /><label>Yes</label>
              </div>
              <div>
              <input
              className="mr-2"
                type={"radio"}
                name="practicalExam"
                value={false}
                onChange={handleInputs}
              /><label>No</label>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                feeStatus
              </label>
              <div className="mr-6">
              <input
              className="mr-2"
                type={"radio"}
                name="feeStatus"
                value={true}
                onChange={handleInputs}
              /><label>Paid</label>
              </div>
              <div>
              <input
              className="mr-2"
                type={"radio"}
                name="feeStatus"
                value={false}
                onChange={handleInputs}
              /><label>Not Paid</label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="w-1/3 bg-black text-white font-bold uppercase py-2 px-6 rounded-lg hover:bg-red-500 hover:text-black"
                 onClick={postData}
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
        <div className="bg-neutral-900 rounded-full shadow-lg hover:scale-110 cursor-pointer py-2 px-4 text-white absolute bottom-6 right-6 z-50">Import Students</div>
      </div>
    </>
  );
}

export default AddStudent;