import React from "react";

interface CategoryCheckboxesProps {
  selectedCategories: string[];
  onChange: (selected: string[]) => void;
}

const categories = ["Video", "Music", "Art", "LLM"];

const CategoryCheckboxes: React.FC<CategoryCheckboxesProps> = ({ selectedCategories, onChange }) => {
  const handleCheckboxChange = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onChange(newSelection);
  };

  return (
    <>
    <label className="block text-sm font-medium mb-2 text-gray-300">Select Categories</label>
    <div className="p-4 w-full border border-gray-600 rounded-md bg-[#212325] mb-2">
      <div className="flex flex-wrap gap-20 justify-center">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="w-4 h-4"
            />
            {category}
          </label>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default CategoryCheckboxes;