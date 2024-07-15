import { baseServer } from "@/constant";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: `${baseServer}/api`,
});

export default baseUrl;
