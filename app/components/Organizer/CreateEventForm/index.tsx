"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateEventForm () {
  const [isSameDate, setIsSameDate] = useState(false);

  const formik = useFormik({
    initialValues: {
      eventName: '',
      startDate: '',
      endDate: '',
      timezone: '',
      locationName: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zip: '',
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      endDate: Yup.date().required('Required'),
      timezone: Yup.string().required('Required'),
      locationName: Yup.string().required('Required'),
      address1: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      zip: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Event</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name*</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Event Name"
              {...formik.getFieldProps('eventName')}
            />
            {formik.touched.eventName && formik.errors.eventName ? (
              <div className="text-red-500 text-sm">{formik.errors.eventName}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Start Date</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('startDate')}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event End Date</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded"
              disabled={isSameDate}
              {...formik.getFieldProps('endDate')}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone*</label>
            <select
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('timezone')}
            >
              <option value="">Select Timezone</option>
              <option value="GMT-08:00">(GMT-08:00) Pacific Time (US & Canada)</option>
              {/* Add more timezones as options here */}
            </select>
            {formik.touched.timezone && formik.errors.timezone ? (
              <div className="text-red-500 text-sm">{formik.errors.timezone}</div>
            ) : null}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Event Location Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Event Location"
              {...formik.getFieldProps('locationName')}
            />
            {formik.touched.locationName && formik.errors.locationName ? (
              <div className="text-red-500 text-sm">{formik.errors.locationName}</div>
            ) : null}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Event Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line1</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Address"
              {...formik.getFieldProps('address1')}
            />
            {formik.touched.address1 && formik.errors.address1 ? (
              <div className="text-red-500 text-sm">{formik.errors.address1}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line2</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Address"
              {...formik.getFieldProps('address2')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('country')}
            >
              <option value="">Select Country</option>
              {/* Add more countries as options here */}
            </select>
            {formik.touched.country && formik.errors.country ? (
              <div className="text-red-500 text-sm">{formik.errors.country}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              className="mt-1 p-2 w-full border rounded"
              disabled
              {...formik.getFieldProps('state')}
            >
              <option value="">Select country first</option>
              {/* Add states as options here based on selected country */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="City"
              {...formik.getFieldProps('city')}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="ZIP"
              {...formik.getFieldProps('zip')}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div className="text-red-500 text-sm">{formik.errors.zip}</div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="sameDates"
            checked={isSameDate}
            onChange={() => setIsSameDate(!isSameDate)}
            className="mr-2"
          />
          <label htmlFor="sameDates" className="text-sm font-medium text-gray-700">
            Check if start and end dates are the same
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
