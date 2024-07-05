import React, { useState, useEffect } from "react";

function FilterSidebar({ filters, setFilters }: any) {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    fetch("your_category_api_url")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch locations from API (e.g., for Indonesia)
    fetch("your_location_api_url")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleDurationChange = (event:any) => {
    setFilters({ ...filters, duration: event.target.value });
  };

  const handleTopicChange = (event:any) => {
    setFilters({ ...filters, topic: event.target.value });
  };

  return (
    <div className="w-full sm:w-1/4 p-4 border-r border-gray-200 py-10 sticky top-0 h-screen">
      {/* <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Category</h3>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              name="duration"
              value={category.value}
              onChange={handleDurationChange}
            />
            <label className="ml-2">{category.label}</label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Location</h3>
        {locations.map((location) => (
          <div key={location.id}>
            <input
              type="checkbox"
              name="topic"
              value={location.value}
              onChange={handleTopicChange}
            />
            <label className="ml-2">{location.label}</label>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default FilterSidebar;