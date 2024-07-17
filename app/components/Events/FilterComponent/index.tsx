import React, { useState, useEffect } from "react";
import categoriesData from "@/utils/categories";

interface FilterComponentProps {
  initialFilters: {
    categories: string[];
    locations: string[];
    prices: string[];
  };
  onFilterChange: (filters: {
    categories: string[];
    locations: string[];
    prices: string[];
  }) => void;
  onResetFilters: () => void;
}

function FilterComponent({
  initialFilters,
  onFilterChange,
  onResetFilters,
}: FilterComponentProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialFilters.categories.length > 0 ? initialFilters.categories[0] : ""
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    initialFilters.locations.length > 0 ? initialFilters.locations[0] : ""
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(
    initialFilters.prices.length > 0 ? initialFilters.prices[0] : ""
  );
  const [showMoreCategories, setShowMoreCategories] = useState<boolean>(false);
  const [showMoreLocations, setShowMoreLocations] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://alamat.thecloudalert.com/api/kabkota/get");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        const fetchedLocations = data.result
          .filter((location: any) => location.text.includes("Kota "))
          .map((location: any) => location.text.replace("Kota ", ""));
        setLocations(fetchedLocations);
      } catch (err: any) {
        console.error("Fetching locations error:", err);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    setSelectedCategory(
      initialFilters.categories.length > 0 ? initialFilters.categories[0] : ""
    );
    setSelectedLocation(
      initialFilters.locations.length > 0 ? initialFilters.locations[0] : ""
    );
    setSelectedPrice(
      initialFilters.prices.length > 0 ? initialFilters.prices[0] : ""
    );
  }, [initialFilters]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      categories: [category],
      locations: selectedLocation ? [selectedLocation] : [],
      prices: selectedPrice ? [selectedPrice] : [],
    });
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onFilterChange({
      categories: selectedCategory ? [selectedCategory] : [],
      locations: [location],
      prices: selectedPrice ? [selectedPrice] : [],
    });
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    onFilterChange({
      categories: selectedCategory ? [selectedCategory] : [],
      locations: selectedLocation ? [selectedLocation] : [],
      prices: [price],
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedPrice("");
    onResetFilters();
  };

  return (
    <div className="filter-component">
      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Category</h3>
        {categoriesData.slice(0, showMoreCategories ? categoriesData.length : 3).map((category) => (
          <div key={category.id} className="filter-option mb-1 text-sm">
            <input
              type="radio"
              id={`category-${category.id}`}
              checked={selectedCategory === category.name}
              onChange={() => handleCategoryChange(category.name)}
            />
            <label htmlFor={`category-${category.id}`} className="px-2">
              {category.name}
            </label>
          </div>
        ))}
        {categoriesData.length > 3 && (
          <button
            className="text-blue-500 text-sm"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Location</h3>
        {locations.slice(0, showMoreLocations ? locations.length : 3).map((location) => (
          <div key={location} className="filter-option mb-1 text-sm">
            <input
              type="radio"
              id={`location-${location}`}
              checked={selectedLocation === location}
              onChange={() => handleLocationChange(location)}
            />
            <label htmlFor={`location-${location}`} className="px-2">
              {location}
            </label>
          </div>
        ))}
        {locations.length > 3 && (
          <button
            className="text-blue-500 text-sm"
            onClick={() => setShowMoreLocations(!showMoreLocations)}
          >
            {showMoreLocations ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Price</h3>
        {["Free", "Paid"].map((price) => (
          <div key={price} className="filter-option mb-1 text-sm">
            <input
              type="radio"
              id={`price-${price}`}
              checked={selectedPrice === price}
              onChange={() => handlePriceChange(price)}
            />
            <label htmlFor={`price-${price}`} className="px-2">
              {price}
            </label>
          </div>
        ))}
      </div>

      <div className="px-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FilterComponent;