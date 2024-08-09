"use client";

import React from 'react';
import EventForm, { FormValues } from '@/components/EventForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

const CreateEventPage: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Adjust as necessary
  const { data: session } = useSession();
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

      // Handle success (e.g., redirect or show a success message)
      router.push('/events'); // Adjust the route as necessary
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return <EventForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default CreateEventPage;
