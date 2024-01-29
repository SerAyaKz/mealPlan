import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#222] text-white">
      <div className="flex flex-col items-center gap-[30px] py-[50px] px-[92px] space-x-[37px] font-Lora text-[20px]">
        &copy; {new Date().getFullYear()} Mealka. All rights reserved.
      </div>
    </footer>
  );
}
