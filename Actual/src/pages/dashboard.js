import React, { Children } from "react";
import { Navbar } from "../components/navbar";

export const Dashboard = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

function Section({ text }) {
  return (
    <>
      <div className="w-[80%] border-2 border-gray-700 m-auto h-[30vh]">
        <h1>{text}</h1>
      </div>
    </>
  );
}
