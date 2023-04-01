import axios from "axios";

const httpKiemTraDeThi = axios.create({
  baseURL: "http://localhost:44321/DeThi/",
  timeout: 3500,
});
export default httpKiemTraDeThi;
