import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://facebook-clone-eomi.onrender.com/api",
});

export default baseUrl;
