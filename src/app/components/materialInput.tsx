"use client";
import React from "react";
import { Input } from "@material-tailwind/react";
//@ts-ignore
function MaterialInput({ label, onChange ,type}) {
  return (
    //@ts-ignore
    <Input
      onChange={onChange}
      type={type}
      containerProps={{ className: "max-w-lg" }}
      color="white"
      label={label}
    />
  );
}

export default MaterialInput;
