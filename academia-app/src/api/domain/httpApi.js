import axios from "axios";

const httpApi = axios.create({
  baseURL: "http://localhost:44321/",
  timeout: 3000,
});

export default httpApi;
