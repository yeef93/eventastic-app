import { useRouter } from "next/router";

const EventsPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Events for Category: {category}</h1>
      </div>
  );
};

export default EventsPage;
