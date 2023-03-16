import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "../components/OtpInput";
import Spinner from "@/components/Spinner";

const Home = () => {
  const [status, setStatus] = useState(0);
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [operation, setOperation] = useState("");
  const [error, setError] = useState({ field: "", message: "" });
  const [loading, setLoading] = useState(false);

  const loginHandler = async (operation) => {
    if (phone.trim() !== "") {
      await sendOtp(operation);
    } else {
      toast.error("please enter your phone number", {
        position: "bottom-right",
      });
      return;
    }
  };

  const sendOtp = async (operation) => {
    var data = JSON.stringify({
      phone: phone,
      operation: operation,
      role: 4,
    });
    setLoading(true);

    var config = {
      method: "post",
      url: "https://api.test.festabash.com/v1/login/phone-login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setStatus(2);
        // return response.data;
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setError({ field: "phone", message: error.response.data.message });
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
        setLoading(false);
      });
  };

  const registerHandler = async (operation) => {
    if (phone.trim() !== "" && username.trim() !== "") {
      await sendOtp(operation);
    } else {
      return;
    }
  };

  const verifyOtp = async (operation) => {
    if (otp.trim() !== "") {
      var data = JSON.stringify({
        phone: phone,
        operation: operation,
        role: 4,
        otp: otp,
      });
      setLoading(true);
      var config = {
        method: "patch",
        url: "https://api.test.festabash.com/v1/login/phone-login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(async function (response) {
          console.log(response.data);

          if (operation === "signup") {
            var data2 = JSON.stringify({
              role: 4,
              registrationToken: response.data.registrationToken,
              name: username,
              phone: phone,
            });

            var config2 = {
              method: "post",
              url: "https://api.test.festabash.com/v1/user",
              headers: {
                "Content-Type": "application/json",
              },
              data: data2,
            };

            await axios(config2)
              .then(function (response) {
                console.log(response.data);
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
                setError({ field: "", message: "" });
                router.push("/onboarding");
                setLoading(false);
              })
              .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.message, {
                  position: "bottom-right",
                });
                setLoading(false);
              });
          } else {
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setError({ field: "", message: "" });
            router.push("/dashboard");
            setLoading(false);

            return;
          }
        })
        .catch(function (error) {
          console.log(error);
          toast.error(error.response.data.message, {
            position: "bottom-right",
          });
          setLoading(false);
        });
    } else {
      toast.error("please enter valid otp", {
        position: "bottom-right",
      });
    }
  };

  function phoneChange(event) {
    const inputPhoneNumber = event.target.value;

    // Only allow digits, spaces, and dashes
    const regex = /^[\d\s\-]{0,10}$/;

    // Check if the input matches the regex
    if (regex.test(inputPhoneNumber) && inputPhoneNumber.length <= 10) {
      setPhone(inputPhoneNumber);
    }
  }

  return (
    <div className="w-screen bg-gray-900">
      <div className="z-50 text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex min-h-screen justify-center rounded-xl items-center overflow-hidden">
        <div className="w-full md:h-4/5 pb-3 border rounded-xl grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden md:flex flex-col justify-center items-center border border-r-gray-600 border-t-0 border-b-0 border-l-0">
            <div className="p-3 mt-2 bg-white flex justify-center items-center rounded-2xl bg-opacity-10">
              <img className="w-4/5" src={"/images/Login.svg"} />
            </div>
            <div className="my-2 text-2xl w-3/5 text-center font-bold">
              Create, Invite and Manage Events
            </div>
          </div>
          <div className=" relative flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <img src={"/images/logoFinal.png"} className="w-32 my-3" />
            </div>

            <div className="mt-3 w-10/12 rounded-xl bg-white shadow grid grid-cols-2 h-12">
              <div
                onClick={() => {
                  setStatus(0);
                  setOperation("");
                }}
                className={
                  status === 0
                    ? "bg-indigo-700 rounded-xl w-full cursor-pointer text-white flex justify-center items-center font-medium text-lg"
                    : operation === "login"
                    ? "bg-indigo-700 rounded-xl w-full cursor-pointer text-white flex justify-center items-center font-medium text-lg"
                    : "bg-white rounded-xl w-full cursor-pointer text-gray-700 flex justify-center items-center font-medium text-lg"
                }
              >
                Sign In
              </div>
              <div
                onClick={() => {
                  setStatus(1);
                  setOperation("");
                }}
                className={
                  status === 1
                    ? "bg-indigo-700 rounded-xl w-full cursor-pointer text-white flex justify-center items-center font-medium text-lg"
                    : operation === "signup"
                    ? "bg-indigo-700 rounded-xl w-full cursor-pointer text-white flex justify-center items-center font-medium text-lg"
                    : "bg-white rounded-xl w-full cursor-pointer text-gray-700 flex justify-center items-center font-medium text-lg"
                }
              >
                Register
              </div>
            </div>
            {status === 0 ? (
              <div className="w-10/12">
                <div className="mb-6 mt-7 w-full">
                  <label className="block mb-2 text-sm">Phone Number</label>
                  <input
                    value={phone}
                    placeholder="1234567890"
                    onChange={phoneChange}
                    className="bg-transparent border border-gray-300 text-gray-200 text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400"
                  />
                  {error.field === "phone" && (
                    <p class="mt-px text-xs text-white">{error.message}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setOperation("login");
                    loginHandler("login");
                  }}
                  disabled={loading}
                  className="disabled:bg-gray-500 w-full py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transform duration-200 shadow"
                >
                  {loading ? (
                    <div className="flex justify-center space-x-2 items-center">
                      <Spinner /> <div>{"Send OTP"}</div>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>

                <div className="w-full text-xs text-gray-400 justify-center mt-2 flex space-x-1">
                  <div>Don't have an account ?</div>
                  <div
                    onClick={() => {
                      setStatus(1);
                      setUsername("");
                      setPhone("");
                    }}
                    className="cursor-pointer text-indigo-400"
                  >
                    Register
                  </div>
                </div>
              </div>
            ) : status === 1 ? (
              <div className="w-10/12">
                <div className="my-6 w-full">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm">Name</label>
                    <input
                      type="text"
                      value={username}
                      required={true}
                      placeholder="Enter your name"
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent border border-gray-300 text-gray-200 text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Phone Number</label>
                    <input
                      value={phone}
                      required={true}
                      placeholder="Enter your phone"
                      onChange={phoneChange}
                      className="bg-transparent border border-gray-300 text-gray-200 text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOperation("signup");
                    registerHandler("signup");
                  }}
                  disabled={loading}
                  className="disabled:bg-gray-500 w-full py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transform duration-200 shadow"
                >
                  {loading ? (
                    <div className="flex justify-center space-x-2 items-center">
                      <Spinner /> <div>{"Send OTP"}</div>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <div className="w-full text-xs text-gray-400 justify-center mt-2 flex space-x-1">
                  <div>Already have an account ?</div>
                  <div
                    onClick={() => {
                      setStatus(0);
                      setUsername("");
                      setPhone("");
                    }}
                    className="cursor-pointer text-indigo-400"
                  >
                    Login
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-10/12">
                <div className="my-6 w-full">
                  <label className="block mb-2 text-sm">Enter OTP</label>
                  <OtpInput otp={otp} setOtp={setOtp} />
                </div>
                <button
                  onClick={() => verifyOtp(operation)}
                  disabled={loading}
                  className="disabled:bg-gray-500 w-full py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transform duration-200 shadow"
                >
                  {loading ? (
                    <div className="flex justify-center space-x-2 items-center">
                      <Spinner /> <div>{"Verify"}</div>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.layout = null;

export default Home;
