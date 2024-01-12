import { config } from "@/config/config";
import Axios from "axios";

export const pokedex = Axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-type": "application/json",
  },
  responseType: "json",
  transitional: {
    silentJSONParsing: true,
  },
});
