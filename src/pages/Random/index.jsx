import { Navbar, Footer } from "../../components/common/index";
import { RandomList } from "../../components/random/index";
import { Navigate } from "react-router-dom";
import { db } from "../../config/firebase";
import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";

const Random = () => {
  const [recipes, setRecipes] = useState([]);
  const isUserLoggedIn = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (!isUserLoggedIn) {
      return;
    }

    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("USER"));
      const collectionRef = collection(db, "recipe");
      const q = query(collectionRef, where("userID", "==", user.uid));
      const data = await getDocs(q);
      setRecipes(
        data.docs.map((doc, index) => ({
          id: index + 1,
          name: doc.data().name || "", // replace with actual property
          photo_link: doc.data().photo_link || "", // replace with actual property
          type: doc.data().type_id || "", // replace with actual property
        
        }))
      );
    };

    fetchData();
  }, [isUserLoggedIn]); // Dependency array now includes isUserLoggedIn

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }
console.log(recipes[0])
  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />

      {/* Body Content */}
    {recipes && <RandomList recipes={recipes} />}

      <Footer />
    </div>
  );
};

export default Random;
