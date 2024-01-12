import { useState } from "react";
import { config } from "../config/config";

export function useConfig() {
  const [vars] = useState(config);

  return vars;
}
