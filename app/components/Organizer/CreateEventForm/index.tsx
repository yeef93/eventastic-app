"use client";
import React, { useState } from 'react';
import { useFormik, Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface TicketType {
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number | string;
  ticketLimit: number | string;
}

interface FormValues {
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  description: string;
  image: File | null;
  category: string;
  location: string;
  venue: string;
  isFree: boolean;
  tickets: TicketType[];
}

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),
  eventDate: Yup.date().required('Event Date is required'),
  startTime: Yup.string().required('Start Time is required'),
  endTime: Yup.string().required('End Time is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  location: Yup.string().required('Location is required'),
  venue: Yup.string().required('Venue is required'),
  isFree: Yup.boolean(),
  tickets: Yup.array().of(
    Yup.object().shape({
      ticketName: Yup.string().required('Ticket Name is required'),
      ticketDescription: Yup.string().required('Ticket Description is required'),
      ticketPrice: Yup.number().required('Ticket Price is required').positive('Ticket Price must be positive'),
      ticketLimit: Yup.number().required('Ticket Limit is required').positive('Ticket Limit must be positive'),
    })
  ).when('isFree', {
    is: false,
    then: (schema) => schema.min(1, 'At least one ticket type is required')
  }),
});

const CreateEventForm: React.FC = () => {
  const [isFree, setIsFree] = useState(false);

  const initialValues: FormValues = {
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    description: '',
    image: null,
    category: '',
    location: '',
    venue: '',
    isFree: false,
    tickets: [
      {
        ticketName: '',
        ticketDescription: '',
        ticketPrice: '',
        ticketLimit: '',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Event</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Name*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Event Name"
                  name="eventName"
                />
                <ErrorMessage name="eventName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Date*</label>
                <Field
                  type="date"
                  className="mt-1 p-2 w-full border rounded"
                  name="eventDate"
                />
                <ErrorMessage name="eventDate" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time*</label>
                <Field
                  type="time"
                  className="mt-1 p-2 w-full border rounded"
                  name="startTime"
                />
                <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time*</label>
                <Field
                  type="time"
                  className="mt-1 p-2 w-full border rounded"
                  name="endTime"
                />
                <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description*</label>
                <Field
                  as="textarea"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Event Description"
                  name="description"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded"
                  onChange={(event) => {
                    setFieldValue('image', event.target.files?.[0] ?? null);
                  }}
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Category"
                  name="category"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Location"
                  name="location"
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Venue*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Venue"
                  name="venue"
                />
                <ErrorMessage name="venue" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center">
                <Field
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                  checked={isFree}
                  onChange={() => {
                    setIsFree(!isFree);
                    setFieldValue('isFree', !isFree);
                  }}
                  className="mr-2"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                  Free Event
                </label>
              </div>
            </div>

            {!values.isFree && (
              <FieldArray name="tickets">
                {({ push, remove }) => (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
                    {values.tickets.map((ticket, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b pb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ticket Name*</label>
                          <Field
                            type="text"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Ticket Name"
                            name={`tickets.${index}.ticketName`}
                          />
                          <ErrorMessage name={`tickets.${index}.ticketName`} component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ticket Description*</label>
                          <Field
                            as="textarea"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Ticket Description"
                            name={`tickets.${index}.ticketDescription`}
                          />
                          <ErrorMessage name={`tickets.${index}.ticketDescription`} component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ticket Price*</label>
                          <Field
                            type="number"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Ticket Price"
                            name={`tickets.${index}.ticketPrice`}
                          />
                          <ErrorMessage name={`tickets.${index}.ticketPrice`} component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ticket Limit*</label>
                          <Field
                            type="number"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Ticket Limit"
                            name={`tickets.${index}.ticketLimit`}
                          />
                          <ErrorMessage name={`tickets.${index}.ticketLimit`} component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg"
                          >
                            Remove Ticket
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            ticketName: '',
                            ticketDescription: '',
                            ticketPrice: '',
                            ticketLimit: '',
                          })
                        }
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg"
                      >
                        Add Ticket
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg"
            >
              Create Event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;