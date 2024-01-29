import { Navbar, Footer } from "../../components/common/index";
import { EditableTable, RecipeTable } from "../../components/form/index";
import { Navigate } from "react-router-dom";

import React from "react";
const Form = () => {
  const isUserLoggedIn = localStorage.getItem("ACCESS_TOKEN");

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }
  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />

      {/* Body Content */}
      <div className="  text-[#222] pl-[92px] py-[30px] ">
        <div className="text-[40px] font-Lora" id="Type">
          Types
        </div>
        <p className="font-Lora text-[15px] text-[#222] w-[70%] leading-[25px]">
          Kindly categorize the type of the dish you are referring to. Examples
          of categories include, but are not limited to, Snack 🍱, Drink 🥤...
        </p>

        <EditableTable object="type" />
      </div>
      <div className="  text-[#222] pl-[92px] py-[30px] ">
        <div className="text-[40px] font-Lora" id="Ingredient">
          Ingredients
        </div>
        <p className="font-Lora text-[15px] text-[#222] w-[70%] leading-[25px]">
          List the ingredients to be used in the recipe.
        </p>

        <EditableTable object="ingredient" />
      </div>
      <div className="  text-[#222] pl-[92px] py-[30px] ">
        <div className="text-[40px] font-Lora" id="Recipes">
          Recipes
        </div>
        <p className="font-Lora text-[15px] text-[#222] w-[70%] leading-[25px]">
          Compose the recipe, incorporating the proper dish type and specifying
          the ingredients along with their respective quantities.
        </p>
        <RecipeTable object="recipe" />
      </div>
      <div className="fixed bottom-8 right-8 flex flex-col gap-2">
        <button
          onClick={() => scrollToSection("Type")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Type
        </button>
        <button
          onClick={() => scrollToSection("Ingredient")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Ingredients
        </button>
        <button
          onClick={() => scrollToSection("Recipes")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
        >
          Recipes
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Form;
