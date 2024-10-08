import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal";
import { signIn } from "next-auth/react";
import { error } from 'console';

interface SignUpModalProps {
  onClose: () => void;
  openLogin: () => void;
  onSuccess: () => void;
}

function SignUpModal({ onClose, openLogin, onSuccess }: SignUpModalProps) {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const initialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    referralCode: "",
    role: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Retype Password is required"),
    referralCode: Yup.string(),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const requestData = {
      username: values.username,
      email: values.email,
      password: values.password,
      fullName: values.fullName, // Use fullName here instead of username
      refCodeUsed: values.referralCode,
      isOrganizer: values.role === "Organizer",
    };

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log(response)

      if (!response.ok) {
        const errorMessage = await response.text();
        const errorData = JSON.parse(errorMessage);
        console.log(errorData.error);

        if (errorData.error === "UserNotFoundException") {
          setRegisterError("No code found, make sure you've entered the right referral code");
        } 
        else if (errorData.error === "DuplicateCredentialsException") {
          setRegisterError("Username or email already exists");
        } else {
          setRegisterError("Registration failed. Please try again later."); // Generic error message
        }

        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      // Automatically log in the user after successful registration
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      onSuccess();
      onClose();
    } catch (error:any) {
      console.error("Error during registration:", error);
      // setRegisterError("Registration failed. Please try again later."); // Catch-all error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative z-50 max-w-md w-full">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
            Sign Up
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <div className="flex space-x-4">
                    <label>
                      <Field
                        type="radio"
                        name="role"
                        value="User"
                        className="mr-2"
                      />
                      User
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="role"
                        value="Organizer"
                        className="mr-2"
                      />
                      Organizer
                    </label>
                  </div>
                  <ErrorMessage
                    name="role"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Choose a username"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="retypePassword"
                  >
                    Retype Password
                  </label>
                  <Field
                    type="password"
                    name="retypePassword"
                    id="retypePassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Retype your password"
                  />
                  <ErrorMessage
                    name="retypePassword"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="referralCode"
                  >
                    Referral Code (optional)
                  </label>
                  <Field
                    type="text"
                    name="referralCode"
                    id="referralCode"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter referral code if you have one"
                  />
                  <ErrorMessage
                    name="referralCode"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                  {registerError && (
                    <p className="text-red-500 text-xs italic mt-2">{registerError}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="inline-block">
                    Already a member?{" "}
                    <a
                      onClick={() => {
                        onClose();
                        openLogin();
                      }}
                      className="text-purple-800 font-bold cursor-pointer"
                    >
                      Log in
                    </a>
                  </p>
                  <button
                    className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;