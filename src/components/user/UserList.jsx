import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";

const UserList = () => {
  const { userID } = useParams();
  let user = JSON.parse(localStorage.getItem("USER"));

  const finalUserID = userID || user.uid;
  const [recipes, setRecipes] = useState([]);
  const collectionRef = collection(db, "recipe");

  useEffect(() => {
    const getRecipes = async () => {
      const q = query(collectionRef, where("userID", "==", finalUserID));
      const data = await getDocs(q);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRecipes();
  }, []);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({
      behavior: "smooth",
    });
  };

  const groupedRecipes = recipes.reduce((acc, recipe) => {
    acc[recipe.type_id] = acc[recipe.type_id] || [];
    acc[recipe.type_id].push(recipe);
    return acc;
  }, {});

  return (
    <div className="container mx-auto pl-[92px] py-[50px]">
      {/* Buttons for scrolling to each type section */}
      <div className="mb-8 flex gap-4">
        {Object.keys(groupedRecipes).map((type_id) => (
          <button
            key={type_id}
            className="text-xl font-bold bg-blue-500 text-white px-4 py-2 rounded capitalize focus:outline-none font-Lora"
            onClick={() => scrollToSection(type_id)}
          >
            {type_id}
          </button>
        ))}
      </div>

      {Object.entries(groupedRecipes).map(([type_id, recipes]) => (
        <div key={type_id} className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-800 mb-3 capitalize font-Lora"
            id={`${type_id}`}
          >
            {type_id}
          </h2>
          <div className="flex overflow-x-auto gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="min-w-max">
                <Link to={`/recipe/${recipe.id}`}>
                  <img
                    src={recipe.photo_link}
                    alt={recipe.name}
                    className="w-80 h-60 object-cover rounded-lg shadow-md"
                  />
                </Link>
                <p
                  className="text-md font-medium text-gray-700 mt-2 font-Lora"
                  title={recipe.name}
                  onClick={() => handleRecipeClick(recipe)}
                >
                  {recipe.name.length > 35
                    ? recipe.name.substring(0, 35) + "..."
                    : recipe.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Display full recipe name when selected */}
      {selectedRecipe && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 font-Lora">{selectedRecipe.name}</h2>
            <p>{selectedRecipe.description}</p>
            <button onClick={() => setSelectedRecipe(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
