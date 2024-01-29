import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import TagInputAutoSuggest from "./TagInputAutoSuggest";
import { Link } from "react-router-dom";

const RecipeTable = ({ object }) => {
  const user = JSON.parse(localStorage.getItem("USER"));
  const [recipes, setRecipes] = useState([]);
  const [types, setTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredient_array: "",
    photo_link: "",
    type_id: "",
    youtube_link: "",
  });
  const [editState, setEditState] = useState({});
  const collectionRef = collection(db, object);
  const [opeLoader, setOpeLoader] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsEdit, setSelectedTagsEdit] = useState([]);

  const handleChangeInSelectedTags = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };
  const handleChangeInSelectedIngredient = (newSelectedTags) => {
    setSelectedTagsEdit(newSelectedTags);
  };
  useEffect(() => {
    const getRecipes = async () => {
      const q = query(collectionRef, where("userID", "==", user.uid));
      const data = await getDocs(q);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getTypes = async () => {
      const collectionTypes = collection(db, "type");
      const q = query(collectionTypes, where("userID", "==", user.uid));
      const data = await getDocs(q);
      setTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getIngredients = async () => {
      const collectionIngre = collection(db, "ingredient");
      const q = query(collectionIngre, where("userID", "==", user.uid));
      const data = await getDocs(q);
      setIngredients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getIngredients();
    getTypes();
    getRecipes();
  }, [opeLoader, recipes]);

  const handleInputChange = (e, fieldName) => {
    setNewRecipe({ ...newRecipe, [fieldName]: e.target.value });
  };

  const handleAdd = async () => {
    if (!newRecipe.type_id) {
      alert("Type is required!");
      return;
    }
    const newRow = {
      ...newRecipe,
      userID: user.uid,
      ingredient_array: selectedTags,
    };
    await addDoc(collectionRef, newRow);
    setNewRecipe({
      name: "",
      description: "",
      ingredient_array: "",
      photo_link: "",
      type_id: "",
      youtube_link: "",
    });
    setSelectedTags([]);
    setOpeLoader("Add");
  };

  const handleDelete = async (index) => {
    await deleteDoc(doc(db, object, recipes[index]?.id));
    setOpeLoader("Delete");
  };

  const startEdit = (index) => {
    setEditState({ ...recipes[index], index });
    setSelectedTagsEdit(recipes[index].ingredient_array);
  };

  const handleEditChange = (e, field) => {
    setEditState({ ...editState, [field]: e.target.value });
  };

  const saveEdit = async () => {
    const { index, id, ...updatedData } = editState;
    const newRow = { ...updatedData, ingredient_array: selectedTagsEdit };
    await updateDoc(doc(db, object, id), newRow);
    setOpeLoader("Edit");
    setEditState({});
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg py-[50px]">
      <div className="flex flex-col gap-3 mb-4">
        <input
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2"
          value={newRecipe.name}
          onChange={(e) => handleInputChange(e, "name")}
          placeholder="Recipe Name"
        />
        <textarea
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2"
          value={newRecipe.description}
          onChange={(e) => handleInputChange(e, "description")}
          placeholder="Description"
        />

        <TagInputAutoSuggest
          suggestions={ingredients}
          selectedTags={selectedTags}
          changeIngre={handleChangeInSelectedTags}
        />
        <input
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2"
          value={newRecipe.photo_link}
          onChange={(e) => handleInputChange(e, "photo_link")}
          placeholder="Photo Link"
        />
        <div className="flex flex-col gap-3 mb-4">
          <select
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2"
            value={newRecipe.type_id}
            onChange={(e) => handleInputChange(e, "type_id")}
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <input
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2"
          value={newRecipe.youtube_link}
          onChange={(e) => handleInputChange(e, "youtube_link")}
          placeholder="YouTube Link"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
          onClick={handleAdd}
        >
          Add Recipe
        </button>
      </div>

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Description
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Ingredients
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Photo Link
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Type ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              YouTube Link
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-Lora">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <input
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    type="text"
                    value={editState.name}
                    onChange={(e) => handleEditChange(e, "name")}
                  />
                ) : (
                  <Link to={`/recipe/${recipe.id}`}>
                    <span>{recipe.name}</span>
                  </Link>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <textarea
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    value={editState.description}
                    onChange={(e) => handleEditChange(e, "description")}
                  />
                ) : (
                  <span>{recipe.description}</span>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <TagInputAutoSuggest
                    suggestions={ingredients}
                    selectedTags={selectedTagsEdit}
                    changeIngre={handleChangeInSelectedIngredient}
                  />
                ) : (
                  <span>
                    {recipe.ingredient_array &&
                    recipe.ingredient_array.length > 0
                      ? recipe.ingredient_array
                          .map((ingredient) => ingredient.name)
                          .join(", ")
                      : "No ingredients"}
                  </span>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <input
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    type="text"
                    value={editState.photo_link}
                    onChange={(e) => handleEditChange(e, "photo_link")}
                  />
                ) : (
                  <span>{recipe.photo_link}</span>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <select
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    value={editState.type_id}
                    onChange={(e) => handleEditChange(e, "type_id")}
                  >
                    <option value="">Select Type</option>
                    {types.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{recipe.type_id}</span>
                )}
              </td>

              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <input
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    type="text"
                    value={editState.youtube_link}
                    onChange={(e) => handleEditChange(e, "youtube_link")}
                  />
                ) : (
                  <span>{recipe.youtube_link}</span>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm flex gap-2">
                {editState.index === index ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                    onClick={() => startEdit(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
