"use client";

import React, { useEffect, useState } from 'react';
import EventForm, { FormValues } from '@/components/EventForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Function to convert time to HH:mm:ss format
const convertToHHMMSS = (time: string) => {
  return `${time}:00`;
};

const EditEventPage: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Adjust as necessary
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${apiUrl}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Map fetched data to FormValues
        const mappedData: FormValues = {
          eventName: data.title,
          eventDate: data.eventDate,
          startTime: data.startTime.slice(0, 5), // Assuming format HH:MM:SS
          endTime: data.endTime.slice(0, 5),
          description: data.description,
          image: null, // Handle image separately if needed
          category: data.categoryId, // Adjust as necessary
          location: data.location,
          venue: data.venue,
          isFree: data.isFree === 'true',
          tickets: data.ticketTypes.map((ticket: any) => ({
            ticketName: ticket.name,
            ticketDescription: ticket.description,
            ticketPrice: ticket.price,
            ticketLimit: ticket.seatLimit,
          })),
          voucher: {
            code: data.voucher.code,
            description: data.voucher.description,
            percentDiscount: data.voucher.percentDiscount,
            validity: data.voucher.validity,
            useLimit: data.voucher.useLimit,
          },
        };

        setInitialValues(mappedData);
      } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., redirect or show an error message)
      }
    };

    if (id && session) {
      fetchEventData();
    }
  }, [id, session, apiUrl]);

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
      const response = await fetch(`${apiUrl}/events/${id}/update`, {
        method: 'PUT',
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

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return <EventForm initialValues={initialValues} onSubmit={handleSubmit} isEditMode />;
};

export default EditEventPage;