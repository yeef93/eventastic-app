import React, { useState } from "react";

interface FilterComponentProps {
  categories: string[];
  locations: string[];
  onFilterChange: (filters: {
    categories: string[];
    locations: string[];
    prices: string[];
  }) => void;
}

function FilterComponent({
  categories,
  locations,
  onFilterChange,
}: FilterComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

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

  return (
    <div className="filter-component">
      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Category</h3>
        {categories.map((category) => (
          <div key={category} className="filter-option mb-1 text-sm">
            <input
              type="radio"
              id={`category-${category}`}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`} className="px-2">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Location</h3>
        {locations.map((location) => (
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
    </div>
  );
}

export default FilterComponent;