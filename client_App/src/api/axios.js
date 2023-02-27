import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.2.105:5000" });
export default axiosInstance;
