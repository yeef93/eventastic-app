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
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategory.includes(category)
      ? selectedCategory.filter((cat) => cat !== category)
      : [...selectedCategory, category];
    setSelectedCategory(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      locations: selectedLocation,
      prices: selectedPrice,
    });
  };

  const handleLocationChange = (location: string) => {
    const updatedLocations = selectedLocation.includes(location)
      ? selectedLocation.filter((loc) => loc !== location)
      : [...selectedLocation, location];
    setSelectedLocation(updatedLocations);
    onFilterChange({
      categories: selectedCategory,
      locations: updatedLocations,
      prices: selectedPrice,
    });
  };

  const handlePriceChange = (price: string) => {
    const updatedPrices = selectedPrice.includes(price)
      ? selectedPrice.filter((p) => p !== price)
      : [...selectedPrice, price];
    setSelectedPrice(updatedPrices);
    onFilterChange({
      categories: selectedCategory,
      locations: selectedLocation,
      prices: updatedPrices,
    });
  };

  return (
    <div className="filter-component">
      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Category</h3>
        {categories.map((category) => (
          <div key={category} className="filter-option mb-1">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={selectedCategory.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`}>{category}</label>
          </div>
        ))}
      </div>

      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Location</h3>
        {locations.map((location) => (
          <div key={location} className="filter-option mb-1">
            <input
              type="checkbox"
              id={`location-${location}`}
              checked={selectedLocation.includes(location)}
              onChange={() => handleLocationChange(location)}
            />
            <label htmlFor={`location-${location}`}>{location}</label>
          </div>
        ))}
      </div>

      <div className="filter-section mb-4 border-t-2 px-4">
        <h3 className="font-semibold text-lg py-2">Price</h3>
        {["Free", "Paid"].map((price) => (
          <div key={price} className="filter-option mb-1">
            <input
              type="checkbox"
              id={`price-${price}`}
              checked={selectedPrice.includes(price)}
              onChange={() => handlePriceChange(price)}
            />
            <label htmlFor={`price-${price}`}>{price}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterComponent;