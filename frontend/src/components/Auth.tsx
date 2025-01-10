import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinType, signupType } from "../zod";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [SignupInputs, setSignupInputs] = useState<signupType>({
    email: "",
    username: "",
    password: "",
    name: "",
  });
  const [SigninInputs, setSigninInputs] = useState<signinType>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  async function sendReq() {
    try {
      const res =
        type === "signup"
          ? await axios.post(`${BACKEND_URL}/user/signup`, SignupInputs)
          : await axios.post(`${BACKEND_URL}/user/signin`, SigninInputs);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      alert("User authenticated successfully!");
      navigate("/blog");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(
          error.response?.data?.error || "An error occurred. Please try again."
        );
      } else {
        // Handle unexpected errors that are not Axios errors
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. " + error);
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col px-4">
      <div className="h-max w-80 md:w-96 text-center">
        <p className="font-bold text-4xl mb-4">
          {type === "signup" ? "Create an Account" : "Welcome Back"}
        </p>
        <p className="text-gray-500 mb-6">
          {type === "signup" ? (
            <>
              Already have an account?{" "}
              <Link to="/signin" className="text-black hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link to="/signup" className="text-black hover:underline">
                Sign up
              </Link>
            </>
          )}
        </p>
        <div className="space-y-4 text-left">
          {type === "signup" && (
            <FormField
              label="Name"
              onChange={(e) =>
                setSignupInputs({ ...SignupInputs, name: e.target.value })
              }
            />
          )}
          <FormField
            label="Username"
            onChange={(e) =>
              type === "signup"
                ? setSignupInputs({ ...SignupInputs, username: e.target.value })
                : setSigninInputs({ ...SigninInputs, username: e.target.value })
            }
          />
          {type === "signup" && (
            <FormField
              label="Email"
              type="email"
              onChange={(e) =>
                setSignupInputs({ ...SignupInputs, email: e.target.value })
              }
            />
          )}
          <FormField
            label="Password"
            type="password"
            onChange={(e) =>
              type === "signup"
                ? setSignupInputs({ ...SignupInputs, password: e.target.value })
                : setSigninInputs({ ...SigninInputs, password: e.target.value })
            }
          />
          <button
            onClick={sendReq}
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-700"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, type = "text", onChange }: FormFieldProps) => (
  <label className="block">
    <p className="text-gray-700">{label}</p>
    <input
      onChange={onChange}
      name={label.toLowerCase()} // Optional: make it more dynamic
      type={type}
      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
    />
  </label>
);

interface FormFieldProps {
  label: string;
  type?: string; // Optional, defaults to "text"
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
