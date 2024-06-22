import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const initialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    referralCode: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    referralCode: Yup.string(),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Simulate API call or further action with form values
    console.log(values);
    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-500">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>{" "}
      {/* Modal backdrop */}
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
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="fullName"
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
                </div>
                <div className="flex items-center justify-between">
                  <p className="inline-block">
                    Already a member?{" "}
                    <Link href="/login" className="text-purple-800 font-bold">
                      Log in
                    </Link>
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
    </div>
  );
};

export default SignUpModal;
