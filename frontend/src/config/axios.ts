import { baseServer } from "@/constant";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: `http://localhost:8080/api`,
});

export default baseUrl;
