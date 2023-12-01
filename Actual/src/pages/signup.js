import React from "react";
import { AuthScreen } from "../components/AuthScreen";
export const Signup = () => {
  return (
    <AuthScreen auth={"signup"}>
      <form className="w-full">
        <div className="w-full ">
          <label className="text-center text-2xl">Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter Full Name"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
          />
        </div>
        <div className="w-full ">
          <label className=" text-center text-2xl">Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
          />
        </div>
        <div className="w-full ">
          <label className=" text-center text-2xl">Password</label>
          <br />
          <input
            placeholder="Enter Password"
            type="password"
            className="text-xl p-2 border-2  my-2 w-full border-blue-600 rounded-2xl"
          />
        </div>
      </form>
    </AuthScreen>
  );
};
