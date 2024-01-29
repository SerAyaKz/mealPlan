import React, { useState, useRef, useEffect } from "react";

const TagInputAutoSuggest = ({
  suggestions,
  selectedTags = [],
  changeIngre,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleSelectTag = (selectedTag) => {
    setInputValue("");
    changeIngre([...selectedTags, selectedTag]);
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    changeIngre(updatedTags);
  };

  const isTagSelected = (tag) => {
    return (
      selectedTags &&
      selectedTags.some((selectedTag) => selectedTag.id === tag.id)
    );
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !isTagSelected(suggestion)
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full"
          >
            {tag.name}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          className="flex-1 p-1"
          placeholder="Type to search ingredients"
        />
      </div>
      {isFocused && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion) => (
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              key={suggestion.id}
              onClick={() => handleSelectTag(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TagInputAutoSuggest;
