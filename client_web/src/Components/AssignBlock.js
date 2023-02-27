import { useEffect, useState } from "react";
import axios from "../axios/axiosInstance";

const AssignBlock = () => {
  const [hallData, setHallData] = useState([]);
  const [branchData, setBranchData] = useState([]);

  const [Block, setBlock] = useState({
    hallNo: "",
    branchId: "",
    semester: "",
    startRollNo: "",
    endRollNo: "",
  });

  const exams = [1, 2, 3, 4, 5, 6, 7, 8];
  let name, value;

  const handleHallData = async () => {
    const { data } = await axios.post("/get-halls");
    setHallData(data);
  };

  const handleBranchData = async () => {
    const { data } = await axios.get("/get-branchs");
    setBranchData(data);
  };

  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setBlock({ ...Block, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/allocate-hall", Block, {
        method: "POST",
      });
      alert(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleHallData();
    handleBranchData();
  }, []);
  return (
    <>
      <div className="mx-4 mt-4 w-full relative">
        <div>
          <h1 className="text-4xl font-semibold my-2">
            Assign Blocks to Faculties...
          </h1>
          <div className="h-2 bg-neutral-800 rounded-full w-[32rem]"></div>
        </div>
        <div>
          <form className="mx-4 my-8">
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Examination hall
              </label>
              <select
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                name="hallNo"
                id="hallNo"
                value={Block.hallNo}
                onChange={handleInputs}
              >
                <option value={"Select an option"}>Select Hall No</option>

                {Object.keys(hallData).length > 0 &&
                  hallData.map((item, idx) => {
                    return (
                      <>
                        <option value={item.hallNo}>{item.hallNo}</option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Branch
              </label>
              <select
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                name="branchId"
                id="branchId"
                value={Block.branchId}
                onChange={handleInputs}
              >
                <option value={"Select an option"}>Select Branch</option>
                {branchData.map((item) => (
                  <option value={item.branchId}>{item.branchName}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
              <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                Semester
              </label>
              <select
                className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                name="semester"
                id="semester"
                value={Block.semester}
                onChange={handleInputs}
              >
                <option value={"Select an option"}>Select Semester</option>

                {Object.keys(exams).length > 0 &&
                  exams.map((item, idx) => {
                    return (
                      <>
                        <option value={idx + 1}>{idx + 1}</option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="mb-4 flex flex-col w-full sm:flex-row items-start sm:items-center">
              <div className="w-1/3 text-lg">Range of Roll Nos</div>
              <div className="flex flex-row w-full sm:w-2/3">
                <input
                  className=" p-2 w-full sm:w-2/3 mr-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="startRollNo"
                  id="startRollNo"
                  value={Block.startRollNo}
                  onChange={handleInputs}
                  placeholder="Starting Roll No"
                />
                <input
                  className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="endRollNo"
                  id="endRollNo"
                  value={Block.endRollNo}
                  onChange={handleInputs}
                  placeholder="Ending Roll No"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="w-1/3 bg-black text-white font-bold uppercase py-2 px-6 rounded-lg hover:bg-red-500 hover:text-black"
                onClick={postData}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="bg-neutral-900 rounded-full shadow-lg hover:scale-110 cursor-pointer py-2 px-4 text-white absolute bottom-6 right-6 z-50">
          Import Block
        </div>
      </div>
    </>
  );
};

export default AssignBlock;
