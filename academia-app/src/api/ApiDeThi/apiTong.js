import axios from "axios";

const httpTong = axios.create({
  baseURL: "http://localhost:44321/",
  timeout: 3000,
});
export default httpTong;
