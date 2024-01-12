import { Json } from "@/types/general/json.type";

export function objectToQueryString(obj: Json) {
  return new URLSearchParams(obj).toString();
}
