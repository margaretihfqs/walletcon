"use client";
import React from "react";
import { Button } from "@material-tailwind/react";
//@ts-ignore
function MaterialButton({ children, onClick, className ,loading}) {
  return (
    //@ts-ignore
    <Button loading={loading} className="bg-blue-gray-900 max-w-lg w-full" onClick={onClick}>
      {children}
    </Button>
  );
}

export default MaterialButton;
