import axios from "axios";

const httpKiemTra = axios.create({
  baseURL: "http://localhost:44321/DeThi/",
  timeout: 3000,
});
export default httpKiemTra;
