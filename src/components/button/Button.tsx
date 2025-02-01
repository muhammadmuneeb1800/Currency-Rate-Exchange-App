import React from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "../../types/type.ts";

const paddingClasses: Record<4 | 8 | 16 | 24, string> = {
  4: "px-4",
  8: "px-8",
  16: "px-16",
  24: "px-24",
};

const Button: React.FC<ButtonProps> = ({
  link = "#",
  text = "Button",
  pad = 4,
}) => {
  return (
    <Link
      to={link}
      className={`border bg-red-600 ${paddingClasses[pad]} py-3 rounded-md text-white font-medium hover:bg-white hover:border-red-600 hover:text-black transition-all duration-500`}
    >
      {text}
    </Link>
  );
};

export default Button;
