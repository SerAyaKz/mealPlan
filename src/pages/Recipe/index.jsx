import { Navbar, Footer } from "../../components/common/index";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { recipe_id } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipeRef = doc(db, "recipe", recipe_id);
      const recipeSnapshot = await getDoc(recipeRef);
      setRecipes({ ...recipeSnapshot.data(), id: recipeSnapshot.id });
    };

    getRecipes();
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />

      {/* Body Content */}
      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
        <a href={recipes.youtube_link}>
          {" "}
          YouTube Link
          <img class="w-full h-48 object-cover" src={recipes.photo_link} />
        </a>
        <div class="p-4">
          <h2 class="text-2xl font-semibold mb-2 font-Lora">{recipes.name}</h2>

          <p class="text-gray-600 mb-4">{recipes.description}</p>

          <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2 font-Lora">Ingredients:</h3>
            <ul class="list-disc pl-4">
              {recipes.ingredient_array?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2 ">Type:</h3>
            <p class="text-gray-600">{recipes.type_id}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recipe;
