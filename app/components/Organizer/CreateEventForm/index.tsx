"use client";
import React, { useState } from 'react';
import { useFormik, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';

// Helper function to format current date and time
const getCurrentDate = () => new Date().toISOString().split('T')[0];
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0].substring(0, 5);
};

interface TicketType {
  ticketName: string;
  ticketDescription: string;
  ticketPrice: string;
  ticketLimit: string;
}

type TicketTypeErrors = Partial<Record<keyof TicketType, string>>;

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
  ticketTypes: TicketType[];
}

function CreateEventForm() {
  const [isFree, setIsFree] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      eventName: '',
      eventDate: getCurrentDate(),
      startTime: getCurrentTime(),
      endTime: getCurrentTime(),
      description: '',
      image: null,
      category: '',
      location: '',
      venue: '',
      isFree: false,
      ticketTypes: [
        {
          ticketName: '',
          ticketDescription: '',
          ticketPrice: '',
          ticketLimit: '',
        },
      ],
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required('Event Name is required'),
      eventDate: Yup.date().required('Event Date is required'),
      startTime: Yup.string().required('Start Time is required'),
      endTime: Yup.string().required('End Time is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
      location: Yup.string().required('Location is required'),
      venue: Yup.string().required('Venue is required'),
      isFree: Yup.boolean(),
      ticketTypes: Yup.array().of(
        Yup.object({
          ticketName: Yup.string().required('Ticket Name is required'),
          ticketDescription: Yup.string().required('Ticket Description is required'),
          ticketPrice: Yup.number().required('Ticket Price is required').positive('Ticket Price must be positive'),
          ticketLimit: Yup.number().required('Ticket Limit is required').positive('Ticket Limit must be positive'),
        })
      ).when('isFree', {
        is: false,
        then: (schema) => schema.min(1, 'At least one ticket type is required for paid events'),
      }),
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
            <label className="block text-sm font-medium text-gray-700">Event Date*</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('eventDate')}
            />
            {formik.touched.eventDate && formik.errors.eventDate ? (
              <div className="text-red-500 text-sm">{formik.errors.eventDate}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time*</label>
            <input
              type="time"
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('startTime')}
            />
            {formik.touched.startTime && formik.errors.startTime ? (
              <div className="text-red-500 text-sm">{formik.errors.startTime}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time*</label>
            <input
              type="time"
              className="mt-1 p-2 w-full border rounded"
              {...formik.getFieldProps('endTime')}
            />
            {formik.touched.endTime && formik.errors.endTime ? (
              <div className="text-red-500 text-sm">{formik.errors.endTime}</div>
            ) : null}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description*</label>
            <textarea
              className="mt-1 p-2 w-full border rounded"
              placeholder="Event Description"
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image Upload</label>
            <input
              type="file"
              className="mt-1 p-2 w-full border rounded"
              onChange={(event) => {
                formik.setFieldValue('image', event.target.files?.[0] || null);
              }}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category*</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Category"
              {...formik.getFieldProps('category')}
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500 text-sm">{formik.errors.category}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location*</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Location"
              {...formik.getFieldProps('location')}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm">{formik.errors.location}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue*</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Venue"
              {...formik.getFieldProps('venue')}
            />
            {formik.touched.venue && formik.errors.venue ? (
              <div className="text-red-500 text-sm">{formik.errors.venue}</div>
            ) : null}
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center">
            <input
              type="checkbox"
              id="isFree"
              checked={isFree}
              onChange={() => {
                setIsFree(!isFree);
                formik.setFieldValue('isFree', !isFree);
              }}
              className="mr-2"
            />
            <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
              Free Event
            </label>
          </div>
          {!isFree && (
            <FieldArray name="ticketTypes">
              {({ insert, remove, push }) => (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-medium mb-4">Ticket Types</h3>
                  {formik.values.ticketTypes.length > 0 &&
                    formik.values.ticketTypes.map((ticket, index) => (
                      <div key={index} className="mb-4 border-b pb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-medium">Ticket Type {index + 1}</h4>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Name*</label>
                            <input
                              type="text"
                              className="mt-1 p-2 w-full border rounded"
                              placeholder="Ticket Name"
                              {...formik.getFieldProps(`ticketTypes.${index}.ticketName`)}
                            />
                            {formik.touched.ticketTypes?.[index]?.ticketName && 
                             formik.errors.ticketTypes?.[index] && 
                             typeof formik.errors.ticketTypes[index] !== 'string' && 
                             'ticketName' in formik.errors.ticketTypes[index] ? (
                              <div className="text-red-500 text-sm">
                                {(formik.errors.ticketTypes[index] as TicketTypeErrors).ticketName}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Description*</label>
                            <textarea
                              className="mt-1 p-2 w-full border rounded"
                              placeholder="Ticket Description"
                              {...formik.getFieldProps(`ticketTypes.${index}.ticketDescription`)}
                            />
                            {formik.touched.ticketTypes?.[index]?.ticketDescription && 
                             formik.errors.ticketTypes?.[index] && 
                             typeof formik.errors.ticketTypes[index] !== 'string' && 
                             'ticketDescription' in formik.errors.ticketTypes[index] ? (
                              <div className="text-red-500 text-sm">
                                {(formik.errors.ticketTypes[index] as TicketTypeErrors).ticketDescription}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Price*</label>
                            <input
                              type="number"
                              className="mt-1 p-2 w-full border rounded"
                              placeholder="Ticket Price"
                              {...formik.getFieldProps(`ticketTypes.${index}.ticketPrice`)}
                            />
                            {formik.touched.ticketTypes?.[index]?.ticketPrice && 
                             formik.errors.ticketTypes?.[index] && 
                             typeof formik.errors.ticketTypes[index] !== 'string' && 
                             'ticketPrice' in formik.errors.ticketTypes[index] ? (
                              <div className="text-red-500 text-sm">
                                {(formik.errors.ticketTypes[index] as TicketTypeErrors).ticketPrice}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Limit*</label>
                            <input
                              type="number"
                              className="mt-1 p-2 w-full border rounded"
                              placeholder="Ticket Limit"
                              {...formik.getFieldProps(`ticketTypes.${index}.ticketLimit`)}
                            />
                            {formik.touched.ticketTypes?.[index]?.ticketLimit && 
                             formik.errors.ticketTypes?.[index] && 
                             typeof formik.errors.ticketTypes[index] !== 'string' && 
                             'ticketLimit' in formik.errors.ticketTypes[index] ? (
                              <div className="text-red-500 text-sm">
                                {(formik.errors.ticketTypes[index] as TicketTypeErrors).ticketLimit}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    onClick={() => push({ ticketName: '', ticketDescription: '', ticketPrice: '', ticketLimit: '' })}
                  >
                    Add Ticket Type
                  </button>
                </div>
              )}
            </FieldArray>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventForm;