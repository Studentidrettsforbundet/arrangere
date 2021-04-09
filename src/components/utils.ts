import React from "react";

export function is_numeric(str: string) {
  return /^\d+$/.test(str);
}
