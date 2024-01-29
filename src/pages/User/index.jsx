import { Navbar, Footer } from "../../components/common/index";
import { UserList } from "../../components/user/index";
import { Navigate, useParams } from "react-router-dom";
import React from "react";
const User = () => {
  const { userID } = useParams();
  let user = JSON.parse(localStorage.getItem("USER"));

  if (!userID && !user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />
      {/* Body Content */}
      <UserList />
      <Footer />
    </div>
  );
};

export default User;
