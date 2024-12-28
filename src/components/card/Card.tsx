import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import "./card.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <Link to={`/convert?from=${props.to}&to=${props.from}`}>
        <div className="bg-[#F6F6F6] hover-arrow w-44 p-4 rounded-md flex justify-center gap-3 items-center">
          <p className="font-bold text-md">{props.to}</p>
          <div className="arrow-arrow">
            <FaArrowRight />
          </div>
          <p className="font-bold text-lg">{props.from}</p>
        </div>
      </Link>
    </>
  );
}
