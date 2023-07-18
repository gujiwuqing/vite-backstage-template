import { hasButtonPermission } from "@/utils/util";
import React from "react";

type AuthButtonProps = {
  code: string;
  children: React.ReactElement;
};
export default function AuthButton({ code, children }: AuthButtonProps) {
  if (hasButtonPermission(code)) {
    return children;
  }
  return null;
}
