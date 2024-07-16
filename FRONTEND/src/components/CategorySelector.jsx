import React from 'react';
import "./CategorySelector.css"

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {

  if (!categories || categories.length === 0) {
    return <p>No categories available</p>;
  }

  return (
    <select className='header-select' value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="none" defaultValue>Ver todo</option>
      {categories.map((category) => (
        <option key={category.key} value={category.value}>
          {category.key}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;