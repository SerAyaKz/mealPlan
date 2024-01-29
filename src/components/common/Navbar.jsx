import React from "react";
import logo from "../../assets/Logo.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function Navbar() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const navigation = [
    { title: "Home", url: "/" },
    { title: "List", url: "/list" },
    { title: "Random", url: "/random" },
    { title: "Submit Form", url: "/form" },
  ];
  const isUserLoggedIn = localStorage.getItem("ACCESS_TOKEN");

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("USER", JSON.stringify(user));
        localStorage.setItem("ACCESS_TOKEN", token);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.reload();
  };

  return (
    <nav className="w-full">
      <div className="flex items-center gap-[463px] pt-[50px] px-[92px]">
        <a href="">
          <img src={logo} alt="" width={254} height={73} />
        </a>

        <div>
          <ul className="flex justify-center items-center space-x-[37px] font-Lora">
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#00FD74] text-[#222] text-[20px] "
              >
                <a href={item.url}>{item.title}</a>
              </li>
            ))}

            {isUserLoggedIn ? (
              <li
                className="hover:text-[#00FD74] text-[#222] text-[20px]"
                onClick={handleLogout}
              >
                <a href="#">Logout</a>
              </li>
            ) : (
              <li
                className="hover:text-[#00FD74] text-[#222] text-[20px]"
                onClick={handleLogin}
              >
                <a href="#">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
