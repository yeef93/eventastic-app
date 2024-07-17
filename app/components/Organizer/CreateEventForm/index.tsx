import React, { useState } from 'react';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import categories from '@/utils/categories';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from "next/navigation";

// Define interfaces for TicketType and VoucherType
interface TicketType {
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number | string;
  ticketLimit: number | string;
}

interface VoucherType {
  code: string;
  description: string;
  percentDiscount: number;
  validity: number;
  useLimit: number;
}

// Define FormValues interface combining both TicketType and VoucherType
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
  voucher: VoucherType;
}

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),
  eventDate: Yup.date()
    .required('Event Date is required')
    .min(new Date().toISOString().split('T')[0], 'Event Date cannot be in the past'),
  startTime: Yup.string().required('Start Time is required'),
  endTime: Yup.string().required('End Time is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  location: Yup.string().required('Location is required'),
  venue: Yup.string().required('Venue is required'),
  isFree: Yup.boolean(),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        ticketName: Yup.string().required('Ticket Name is required'),
        ticketDescription: Yup.string().required('Ticket Description is required'),
        ticketPrice: Yup.number().required('Ticket Price is required').positive('Ticket Price must be positive'),
        ticketLimit: Yup.number().required('Ticket Limit is required').positive('Ticket Limit must be positive'),
      })
    )
    .when('isFree', {
      is: false,
      then: (schema) => schema.min(1, 'At least one ticket type is required'),
    }),
  voucher: Yup.object().shape({
    code: Yup.string().required('Voucher Code is required'),
    description: Yup.string().required('Voucher Description is required'),
    percentDiscount: Yup.number()
      .required('Percent Discount is required')
      .positive('Percent Discount must be positive')
      .max(100, 'Percent Discount cannot exceed 100%'),
    validity: Yup.number().required('Validity (in days) is required').positive('Validity (in days) must be positive'),
    useLimit: Yup.number().required('Use Limit is required').positive('Use Limit must be positive'),
  }),
});

// Function to get current time in HH:mm format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format
};

// Function to get one hour later time in HH:mm format
const getOneHourLaterTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format
};

// Function to convert time to HH:mm:ss format
const convertToHHMMSS = (time: string) => {
  return `${time}:00`;
};

// Component for CreateEventForm
const CreateEventForm: React.FC = () => {
  const [isFree, setIsFree] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Adjust as necessary
  const { data: session } = useSession();
  const pathname = usePathname();
  const username = pathname.split('/')[2];
  const router = useRouter();

  // Initial values for the form
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
    voucher: {
      code: '',
      description: '',
      percentDiscount: 0,
      validity: 0,
      useLimit: 0,
    },
  };

  // Function to handle form submission
  const handleSubmit = async (values: FormValues) => {
    // console.log(values);
    const formData = {
      title: values.eventName,
      description: values.description,
      categoryId: values.category, // Assuming this is the selected category ID
      location: values.location,
      venue: values.venue,
      map: 'http://example.com/map.png', // Adjust as necessary
      imageId: '1', // Adjust as necessary
      eventDate: values.eventDate,
      startTime: convertToHHMMSS(values.startTime),
      endTime: convertToHHMMSS(values.endTime),
      isFree: values.isFree.toString(),
      referralVoucherUsageLimit: 100, // Example value, adjust as needed
      promoPercent: values.voucher.percentDiscount,
      promoDaysValidity: values.voucher.validity,
      voucherRequestDto: {
        code: values.voucher.code,
        description: values.voucher.description,
        percentDiscount: values.voucher.percentDiscount,
        validity: values.voucher.validity,
        useLimit: values.voucher.useLimit,
      },
      ticketTypeRequestDtos: values.tickets.map((ticket) => ({
        name: ticket.ticketName,
        description: ticket.ticketDescription,
        price: Number(ticket.ticketPrice),
        seatLimit: Number(ticket.ticketLimit),
      })),
    };

    console.log(formData, "end");
    try {
      const response = await fetch(`${apiUrl}/events/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();   
      // const eventId = data.eventId;
      setSuccessMessage('Event created successfully!');
      router.push(`/organizer/${username}/dashboard`);   
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Event</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                  maxLength={255}
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
                <label className="block text-sm font-medium text-gray-700">Category*</label>
                <Field
                  as="select"
                  className="mt-1 p-2 w-full border rounded"
                  name="category"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Location*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Location"
                  name="location"
                  maxLength={100}
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Venue*</label>
                <Field
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Venue"
                  name="venue"
                  maxLength={255}
                />
                <ErrorMessage name="venue" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }
                  }}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="inline-flex items-center mt-3">
                  <Field
                    type="checkbox"
                    className="form-checkbox"
                    name="isFree"
                    onChange={() => {
                      setFieldValue('isFree', !values.isFree);
                      setIsFree(!isFree);
                    }}
                  />
                  <span className="ml-2">Is this event free?</span>
                </label>
              </div>
              {/* Ticket Type Fields */}
              {!isFree && (
                <div className="col-span-1 md:col-span-2">
                  <FieldArray name="tickets">
                    {({ remove, push }) => (
                      <div>
                        {values.tickets.map((ticket, index) => (
                          <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Ticket {index + 1}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Ticket Name*
                                </label>
                                <Field
                                  type="text"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Name"
                                  name={`tickets.${index}.ticketName`}
                                />
                                <ErrorMessage
                                  name={`tickets.${index}.ticketName`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Ticket Description*
                                </label>
                                <Field
                                  type="text"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Description"
                                  name={`tickets.${index}.ticketDescription`}
                                />
                                <ErrorMessage
                                  name={`tickets.${index}.ticketDescription`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Ticket Price*
                                </label>
                                <Field
                                  type="number"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Price"
                                  name={`tickets.${index}.ticketPrice`}
                                />
                                <ErrorMessage
                                  name={`tickets.${index}.ticketPrice`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Ticket Limit*
                                </label>
                                <Field
                                  type="number"
                                  className="mt-1 p-2 w-full border rounded"
                                  placeholder="Ticket Limit"
                                  name={`tickets.${index}.ticketLimit`}
                                />
                                <ErrorMessage
                                  name={`tickets.${index}.ticketLimit`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => remove(index)}
                              >
                                Remove Ticket
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => push({ ticketName: '', ticketDescription: '', ticketPrice: '', ticketLimit: '' })}
                        >
                          Add Ticket
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              )}
              {/* Voucher Fields */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Voucher</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Voucher Code*</label>
                    <Field
                      type="text"
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="Voucher Code"
                      name="voucher.code"
                    />
                    <ErrorMessage name="voucher.code" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Voucher Description*</label>
                    <Field
                      type="text"
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="Voucher Description"
                      name="voucher.description"
                    />
                    <ErrorMessage name="voucher.description" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Percent Discount*</label>
                    <Field
                      type="number"
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="Percent Discount"
                      name="voucher.percentDiscount"
                    />
                    <ErrorMessage name="voucher.percentDiscount" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Validity (in days)*</label>
                    <Field
                      type="number"
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="Validity"
                      name="voucher.validity"
                    />
                    <ErrorMessage name="voucher.validity" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Use Limit*</label>
                    <Field
                      type="number"
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="Use Limit"
                      name="voucher.useLimit"
                    />
                    <ErrorMessage name="voucher.useLimit" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
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