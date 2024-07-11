"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  openSignUp: () => void;
}

function LoginModal ({ onClose, onSuccess, openSignUp }: LoginModalProps){
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { login } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const data = {
      usernameOrEmail: values.email,
      password: values.password,
    };
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Login failed");

      const userData = { email: values.email, avatar: "/public/assets/avatar.png" };
      login(userData);
      onSuccess();
      onClose();
      router.push(`/`);
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Your email and password combination is incorrect. Please try again.");
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
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">Log In</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email address"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic" />
                </div>
                <div>{loginError && <p className="text-red-500 text-xs italic mb-4">{loginError}</p>}</div>
                <div className="flex items-center justify-between">
                  <p className="inline-block">
                    Don&apos;t have an account?{" "}
                    <a
                      onClick={() => {
                        onClose();
                        openSignUp();
                      }}
                      className="text-purple-800 font-bold cursor-pointer"
                    >
                      Sign Up
                    </a>
                  </p>
                  <button
                    className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging In..." : "Log In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;