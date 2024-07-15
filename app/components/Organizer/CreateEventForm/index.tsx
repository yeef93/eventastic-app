"use client";
import React, { useState } from 'react';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import categories from '@/utils/categories';
import { useSession } from "next-auth/react";

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
  eventDate: Yup.date().required('Event Date is required').min(new Date().toISOString().split("T")[0], 'Event Date cannot be in the past'),
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

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format
};

const getOneHourLaterTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format
};

function CreateEventForm() {
  const [isFree, setIsFree] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data: session } = useSession();

  const initialValues: FormValues = {
    eventName: '',
    eventDate: new Date().toISOString().split('T')[0], // Default to today
    startTime: getCurrentTime(), // Default to current time
    endTime: getOneHourLaterTime(), // Default to one hour later
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

  const handleSubmit = async (values: FormValues) => {
    console.log(values);

    const formData = {
      title: values.eventName,
      description: values.description,
      categoryId: values.category, // Assuming this is the selected category ID
      location: values.location,
      venue: values.venue,
      imageId: "1", // Adjust as necessary
      eventDate: values.eventDate,
      startTime: values.startTime,
      endTime: values.endTime,
      isFree: values.isFree.toString(),
      ticketTypeCreateRequestDtos: values.tickets.map(ticket => ({
        name: ticket.ticketName,
        description: ticket.ticketDescription,
        price: Number(ticket.ticketPrice),
        seatLimit: Number(ticket.ticketLimit),
      })),
    };

    try {
      const response = await fetch(`${apiUrl}/events/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Event</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Fields for event details */}
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
                <Field as="select" name="category" className="mt-1 p-2 w-full border rounded">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
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
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Is Free Event?</label>
                <Field
                  type="checkbox"
                  name="isFree"
                  checked={values.isFree}
                  onChange={() => {
                    setIsFree(!isFree);
                    setFieldValue('isFree', !isFree);
                    if (isFree) {
                      setFieldValue('tickets', []);
                    } else {
                      setFieldValue('tickets', [
                        {
                          ticketName: '',
                          ticketDescription: '',
                          ticketPrice: '',
                          ticketLimit: '',
                        },
                      ]);
                    }
                  }}
                />
              </div>
              {!isFree && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Ticket Types</label>
                  <FieldArray name="tickets">
                    {({ push, remove }) => (
                      <>
                        {values.tickets.map((ticket, index) => (
                          <div key={index} className="mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Ticket Name*</label>
                                <Field
                                  type="text"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Name"
                                  name={`tickets[${index}].ticketName`}
                                />
                                <ErrorMessage name={`tickets[${index}].ticketName`} component="div" className="text-red-500 text-sm" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Ticket Description*</label>
                                <Field
                                  type="text"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Description"
                                  name={`tickets[${index}].ticketDescription`}
                                />
                                <ErrorMessage name={`tickets[${index}].ticketDescription`} component="div" className="text-red-500 text-sm" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Ticket Price*</label>
                                <Field
                                  type="number"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Price"
                                  name={`tickets[${index}].ticketPrice`}
                                />
                                <ErrorMessage name={`tickets[${index}].ticketPrice`} component="div" className="text-red-500 text-sm" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Ticket Limit*</label>
                                <Field
                                  type="number"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Limit"
                                  name={`tickets[${index}].ticketLimit`}
                                />
                                <ErrorMessage name={`tickets[${index}].ticketLimit`} component="div" className="text-red-500 text-sm" />
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <button
                                type="button"
                                className="text-red-500 text-sm"
                                onClick={() => remove(index)}
                              >
                                Remove Ticket
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-2 p-2 w-full bg-blue-500 text-white rounded"
                          onClick={() => push({
                            ticketName: '',
                            ticketDescription: '',
                            ticketPrice: '',
                            ticketLimit: '',
                          })}
                        >
                          Add Ticket
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 p-2 w-full bg-green-500 text-white rounded"
              >
                Create Event
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;