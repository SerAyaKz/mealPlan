import React, { useState } from "react";
import TagInputAutoSuggest from "../form/TagInputAutoSuggest";

// Sample recipes array
// const recipes = [
//   {
//     id: 1,
//     name: "A",
//     photo_link: "https://example.com/spaghetti.jpg",
//     type: "cccc",
//   },
//   {
//     id: 2,
//     name: "B",
//     photo_link: "https://example.com/chicken_alfredo.jpg",
//     type: "cccc",
//   },
//   {
//     id: 3,
//     name: "C",
//     photo_link: "https://example.com/spaghetti.jpg",
//     type: "cccc",
//   },
//   {
//     id: 4,
//     name: "D",
//     photo_link: "https://example.com/spaghetti.jpg",
//     type: "cccc",
//   },
//   {
//     id: 5,
//     name: "E",
//     photo_link: "https://example.com/spaghetti.jpg",
//     type: "cccc",
//   },
//   {
//     id: 6,
//     name: "F",
//     photo_link: "https://example.com/spaghetti.jpg",
//     type: "ccdcc",
//   },
//   // Add more recipes as needed
// ];

const RandomList = ({recipes}) => {
  
  const [n, setN] = useState(3); // Number of columns
  const [kValues, setKValues] = useState({}); // K values for each type
  const [selectedRecipes, setSelectedRecipes] = useState({}); // Selected recipes
  const [generation, setGeneration] = useState(0); // Add a generation counter
  // Function to handle change in 'n'
  const handleNChange = (event) => {
    setN(parseInt(event.target.value, 10));
  };
  const [currentTypeSelection, setCurrentTypeSelection] = useState({});
  const [showReplaceOptions, setShowReplaceOptions] = useState({}); // State to toggle replace options visibility

  // Toggle visibility of replace options
  const toggleReplaceOptions = (type, columnIndex, recipeIndex) => {
    const key = `${type}-${columnIndex}-${recipeIndex}`;
    setShowReplaceOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const getRecipesOfType = (type) => {
    return recipes.filter((recipe) => recipe.type === type);
  };
  // Function to handle change in 'k' for each type
  const handleKChange = (type, value) => {
    setKValues({ ...kValues, [type]: parseInt(value, 10) });
  };
  const [showTagInput, setShowTagInput] = useState({}); // State to toggle TagInputAutoSuggest visibility

  // Toggle visibility of TagInputAutoSuggest
  const toggleTagInput = (type, columnIndex) => {
    setShowTagInput((prev) => ({
      ...prev,
      [`${type}-${columnIndex}`]: !prev[`${type}-${columnIndex}`],
    }));
  };
  // Function to randomly select recipes
  const selectRandomRecipes = () => {
    let recipeMap = recipes.reduce((acc, recipe) => {
      if (!acc[recipe.type]) acc[recipe.type] = [];
      acc[recipe.type].push(recipe);
      return acc;
    }, {});

    let newSelectedRecipes = {};
    Object.keys(recipeMap).forEach((type) => {
      newSelectedRecipes[type] = [];
      for (let i = 0; i < n; i++) {
        let availableRecipes = [...recipeMap[type]]; // Create a copy of the recipes array
        let randomSelection = [];

        for (let j = 0; j < (kValues[type] || 1); j++) {
          if (availableRecipes.length === 0) {
            // If we've run out of unique recipes, refill the availableRecipes
            availableRecipes = [...recipeMap[type]];
          }

          // Select a random recipe
          let randomIndex = Math.floor(Math.random() * availableRecipes.length);
          randomSelection.push(availableRecipes[randomIndex]);

          // If k > 1 and there are enough recipes, ensure unique selection by removing the chosen recipe
          if (kValues[type] > 1 && recipeMap[type].length >= kValues[type]) {
            availableRecipes.splice(randomIndex, 1);
          }
        }

        newSelectedRecipes[type].push(randomSelection);
      }
    });
    setGeneration((g) => g + 1);
    setSelectedRecipes(newSelectedRecipes);
  };
  const shouldShowImages = (type) => {
    // Default to 1 if k value is not set
    return kValues[type] === undefined || kValues[type] === 1;
  };
  const [selectedNewRecipe, setSelectedNewRecipe] = useState({}); // State to store the selected new recipe

  // Function to handle the selection of a new recipe
  const handleNewRecipeSelection = (type, columnIndex, recipeIndex, e) => {
    const newSelection = { ...selectedNewRecipe };
    newSelection[`${type}-${columnIndex}-${recipeIndex}`] = e.target.value;
    setSelectedNewRecipe(newSelection);
  };

  const handleSingleRecipeReplace = (type, columnIndex, recipeIndex) => {
    const selectedRecipeId =
      selectedNewRecipe[`${type}-${columnIndex}-${recipeIndex}`];
    const newRecipe = recipes.find((r) => r.id === parseInt(selectedRecipeId)); // Assuming you have this function
    const updatedRecipes = { ...selectedRecipes };
    updatedRecipes[type][columnIndex][recipeIndex] = newRecipe;
    setSelectedRecipes(updatedRecipes);
    setGeneration((g) => g + 1);
  };

  // Function to handle the replacement of all recipes in a cell
  const handleMultipleRecipesReplace = (type, columnIndex, newRecipes) => {
    const updatedRecipes = { ...selectedRecipes };
    updatedRecipes[type][columnIndex] = newRecipes;
    setSelectedRecipes(updatedRecipes);
    setGeneration((g) => g + 1); // Update the generation to trigger re-render
  };
  return (
    <div className="container mx-auto pl-[92px] py-[50px]">
      <div className="mb-4">
        <div className="flex items-center mb-4 space-x-4">
          <label className="text-gray-700 text-sm font-bold font-Lora">
          #️⃣ of Columns:
          </label>
          <input
            type="number"
            value={n}
            onChange={handleNChange}
            min="1"
            max="10"
            className="shadow border rounded py-2 px-3 text-gray-700"
          />
        </div>

        <div className="flex flex-wrap mb-4">
          {Object.keys(
            recipes.reduce((acc, recipe) => {
              acc[recipe.type] = true;
              return acc;
            }, {})
          ).map((type) => (
            <div key={type} className="flex items-center mr-6 mb-4">
              <label className="text-gray-700 text-sm font-bold mr-2 font-Lora">
              #️⃣ for {type}:
              </label>
              <input
                type="number"
                value={kValues[type] || 1}
                onChange={(e) => handleKChange(type, e.target.value)}
                min="1"
                max="10"
                className="shadow border rounded py-2 px-3 text-gray-700"
              />
            </div>
          ))}
        </div>

        <button
          onClick={selectRandomRecipes}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          🔁
        </button>
      </div>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            {Array.from({ length: n }, (_, i) => (
              <th key={i} className="px-4 py-2">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(selectedRecipes).map(([type, recipeGroups]) => (
            <tr key={`${type}-${generation}`}>
              <td className="border px-4 py-2 capitalize">{type}</td>
              {recipeGroups.map((group, columnIndex) => (
                <td
                  key={`${type}-${columnIndex}-${generation}`}
                  className="border px-4 py-2"
                >
                  {group.map((recipe, recipeIndex) => (
                    <div
                      key={`${recipe.id}-${generation}`}
                      className="flex items-center space-x-2"
                    >
                      {shouldShowImages(type) && (
                        <img
                          src={recipe?.photo_link}
                          alt={recipe.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      )}
                      <p>{recipe.name}</p>

                      {(kValues[type] === 1 || kValues[type] === undefined) && (
                        <>
                          <button
                            onClick={() =>
                              toggleReplaceOptions(
                                type,
                                columnIndex,
                                recipeIndex
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          >
                            {showReplaceOptions[
                              `${type}-${columnIndex}-${recipeIndex}`
                            ]
                              ? "🙈"
                              : "👀"}
                          </button>
                          {showReplaceOptions[
                            `${type}-${columnIndex}-${recipeIndex}`
                          ] && (
                            <>
                              <select
                                className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 mr-2"
                                value={
                                  selectedNewRecipe[
                                    `${type}-${columnIndex}-${recipeIndex}`
                                  ] || ""
                                }
                                onChange={(e) =>
                                  handleNewRecipeSelection(
                                    type,
                                    columnIndex,
                                    recipeIndex,
                                    e
                                  )
                                }
                              >
                                {getRecipesOfType(
                                  currentTypeSelection[
                                    `${type}-${columnIndex}-${recipeIndex}`
                                  ] || type
                                ).map((recipe) => (
                                  <option key={recipe.id} value={recipe.id}>
                                    {recipe.name}
                                  </option>
                                ))}
                              </select>

                              <button
                                onClick={() =>
                                  handleSingleRecipeReplace(
                                    type,
                                    columnIndex,
                                    recipeIndex
                                  )
                                }
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded font-Lora"
                              >
                                Replace
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {kValues[type] > 1 && (
                    <>
                      <button
                        onClick={() => toggleTagInput(type, columnIndex)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"
                      >
                        {showTagInput[`${type}-${columnIndex}`]
                          ? "🙈"
                          : "👀"}
                      </button>
                      {showTagInput[`${type}-${columnIndex}`] && (
                        <TagInputAutoSuggest
                          suggestions={recipes}
                          selectedTags={group}
                          changeIngre={(newRecipes) =>
                            handleMultipleRecipesReplace(
                              type,
                              columnIndex,
                              newRecipes
                            )
                          }
                        />
                      )}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RandomList;
