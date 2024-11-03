import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersDb } from "../db/users-db";

interface User {
  employeeId: string;
  roleId: string;
}

export default function Login() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = usersDb.users.find(
      (user: User) => user.employeeId === employeeNumber
    );

    if (user && password === "dost1234") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("roleId", user.roleId);
      localStorage.setItem("employeeId", user.employeeId);

      navigate("/home");
    } else {
      setError("Invalid employee number or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-7xl">
        {}
        <div
          className="hidden lg:flex flex-col justify-center p-10 rounded-l-lg w-1/2 text-white"
          style={{
            backgroundImage: `url('../../public/assets/dostv-square.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-xl font-bold text-center mb-4">
            DOSTv Project Management System
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Streamline, Create, Deliver: Empowering Your Projects with Precision
            and Innovation
          </p>
          <br />

          {}
          {error && <p className="text-custom-red text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="employeeNumber"
              >
                Employee Number
              </label>
              <input
                type="text"
                id="employeeNumber"
                name="employeeNumber"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-teal-400"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-teal-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <a href="/forgot-password" className="text-sm text-teal-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition duration-200"
            >
              Login
            </button>
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}
