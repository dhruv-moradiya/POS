import { Search } from "lucide-react";
import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-linen flex items-center gap-8 p-4 rounded-md shadow">
      <h2 className="text-2xl font-semibold">Restro POS</h2>
      <div className="w-[300px] flex items-center bg-culture-white px-3 py-1 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Search Products..."
          className="flex-1 bg-transparent placeholder:text-black focus:outline-none"
        />
        <Search />
      </div>
    </div>
  );
}

export default Navbar;
