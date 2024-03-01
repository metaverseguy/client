"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReCaptcha from "../../components/ReCaptcha";

interface FormData {
  email: string;
  password: string;
  password2: string;
}


const Register = (): JSX.Element => {
  const notify = () => toast("You have registered successfully!");
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function sendDataToServer(data: FormData) {
    const url = "http://localhost:5000/api/register"; // Replace with your domain in production
    try {
      // Send a POST request
      console.log(data)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Here you can handle the response
      const result = await response.json();
      console.log("Response from the server:", result);
      // Assuming you would navigate after successful register
      notify();
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
    if (formData.password !== formData.password2) {
      toast.warn('Passwords do not match!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      // handleSubmit();
      sendDataToServer(formData);
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
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
                id="password1"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                type="password"
                name="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2">
              <input
                id="password2"
                value={password2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                type="password"
                name="password2"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
        transition={Flip} />
    </div>
    
  );
};

export default Register;
