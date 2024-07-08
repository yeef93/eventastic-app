"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ChangePasswordForm() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required")
  });

  const handleSubmit = (values:any, { setSubmitting, resetForm }:any) => {
    // Simulate API call or password change logic
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="form-group">
              <label htmlFor="oldPassword" className="block mb-1 font-medium">
                Old Password
              </label>
              <Field
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
              />
              <ErrorMessage name="oldPassword" component="div" className="text-red-600 mt-1" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="block mb-1 font-medium">
                New Password
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-600 mt-1" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                Confirm New Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 mt-1" />
            </div>
            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Change Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;