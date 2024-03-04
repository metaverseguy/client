"use client";

import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCaptcha from "../../components/ReCaptcha";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define your Yup schema
const RegisterSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters"),
  email: yup
    .string()
    .email("Invalid email address"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(40, "Password must be not at least 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
});

const RegisterPage: React.FC = () => {
  const notify = () => toast("You have registered successfully!");
  const router = useRouter();
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      // Handle form submission, e.g., call an API
      console.log(values);
    },
  });

  async function sendDataToServer(data: RegisterFormValues) {
    const url = "http://localhost:5000/api/register";
    try {
      // Send a POST request
      // console.log(data);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Here you can handle the response
      const result = await response.json();
      // console.log("Response from the server:", result);
      // Assuming you would navigate after successful register
      if (result.flag == "success") {
        notify();
      } else {
        toast.warn("Email already exist!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending data to server", error.message);
      }
      // Handle errors here or rethrow them depending on your needs
    }
  }
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleReCaptchaChange = (value: any) => {
    // Here you can implement additional logic when recaptcha value changes
    setRecaptchaValue(value);
  };

  const handleSubmit = async () => {
    if (!recaptchaValue) {
      alert("Please verify that you are not a robot.");
      return;
    }
    // Proceed with form submission or whatever you need to do next
    // sendDataToServer(formData);
  };

  // Make sure to use an event parameter of type React.FormEvent<HTMLFormElement> and prevent default behavior
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from submitting by default
    if (formik.values.password !== formik.values.confirmPassword) {
      toast.warn("Passwords do not match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // handleSubmit();
      sendDataToServer(formik.values);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <div>{formik.errors.username}</div>
            )}
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.password && formik.errors.password && (
                <div>{formik.errors.password}</div>
              )}
            </div>
            <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div>{formik.errors.confirmPassword}</div>
                )}
            </div>
          </div>
          {/* <ReCaptcha onChange={handleReCaptchaChange} /> */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Member?{" "}
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>
  );
};

export default RegisterPage;
