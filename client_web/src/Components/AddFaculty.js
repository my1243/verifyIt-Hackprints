import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "../axios/axiosInstance";

const AddFaculty = () => {
	const [Faculty, setFaculty] = useState({
		fId: "",
		fName: "",
		lName: "",
		fShortName: "",
		branchId: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	let name, value;
	const handleInputs = (e) => {
		e.preventDefault();
		name = e.target.name;
		value = e.target.value;
		setFaculty({ ...Faculty, [name]: value });
	};

	console.log(Faculty);
	const handleAddFaculty = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const resp = await axios.post("/create-faculty", Faculty);
		console.log("resp.data", resp.data);
		setIsLoading(false);
	};
	return (
		<>
			<div className="mx-4 mt-4 w-full relative">
				<div>
					<h1 className="text-4xl font-semibold my-2">
						Register New Faculty...
					</h1>
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
						{/* Name */}
						<div className="mb-4 flex flex-col w-full sm:flex-row items-start sm:items-center">
							<div className="w-1/3 text-lg">Name</div>
							<div className="flex flex-row w-full sm:w-2/3">
								<input
									className=" p-2 w-full sm:w-2/3 mr-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
									type={"text"}
									name="fName"
									id="fname"
									value={Faculty.fName}
									onChange={handleInputs}
									placeholder="First Name"
								/>
								<input
									className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
									type={"text"}
									name="lName"
									id="lname"
									value={Faculty.lName}
									onChange={handleInputs}
									placeholder="Last Name"
								/>
							</div>
						</div>
						{/* F iD */}
						<div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
							<label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
								Faculty ID
							</label>
							<input
								className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
								type={"text"}
								name="fId"
								id="fShortName"
								value={Faculty.fId}
								onChange={handleInputs}
								placeholder="Faculty Short Name"
							/>
						</div>
						{/* F short Name */}
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
						{/* Branch */}
						<div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
							<label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
								Branch
							</label>
							<select
								className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
								name="branchId"
								id="branchId"
								value={Faculty.branchId}
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
								onClick={handleAddFaculty}
								disabled={isLoading}
							>
								{isLoading ? (
									<ClipLoader size={20} color="white" />
								) : (
									"Add Faculty"
								)}
							</button>
						</div>
					</form>
				</div>
				<div className="bg-neutral-900 rounded-full shadow-lg hover:scale-110 cursor-pointer py-2 px-4 text-white absolute bottom-6 right-6 z-50">
					Import Faculty
				</div>
			</div>
		</>
	);
};

export default AddFaculty;
