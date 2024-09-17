import { Delete, Edit, Search } from "lucide-react";
import React from "react";
import CustomerSidebar from "../components/customer/CustomerSidebar";

function Customer() {
  return (
    <div className="w-full h-full bg-culture-white rounded-lg shadow-sm px-4 flex gap-3">
      <div className="h-full flex-1 flex flex-col gap-3">
        <CustomerSearchInput />

        <div className="flex items-center gap-4 bg-linen p-2 rounded-md shadow-sm">
          <div className="w-[150px] h-[150px] rounded-md overflow-hidden">
            <img
              src="data:image/webp;base64,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"
              alt="Customer Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Customer Name</h3>
            <p>customer@gmail.com</p>
            <p>+91 12345 67890</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-3 bg-amber-sea text-white px-3 py-1 rounded-md">
                <Edit size={18} />
                <p>Edit</p>
              </button>
              <button className="flex items-center gap-3 bg-amber-sea text-white px-3 py-1 rounded-md">
                <Delete size={18} />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>

        <div className="h-full bg-linen p-2 rounded-md shadow-sm">
          <h2 className="ml-1 my-3 text-xl font-semibold">Recent Customers</h2>
          <ul className="scrollbar flex flex-col gap-2 w-full h-full overflow-y-auto">
            {new Array(20).fill(0).map((item, index) => (
              <li
                className={`flex items-center justify-between gap-6 shadow-sm rounded p-2 ${
                  index % 2 === 0 ? "bg-culture-white" : "bg-linen"
                }`}
                key={index}
              >
                {index}
                <div className="w-[50px] h-[50px] rounded-lg overflow-hidden">
                  <img
                    src="data:image/webp;base64,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"
                    alt="Customer Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Dhruv Moradiya</p>
                  <p>+91 12345 67890</p>
                  <p></p>
                </div>
                <div className="text-[15px] font-semibold">
                  <p>12/2/2024</p>
                  <p>12:45 PM</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CustomerSidebar />
    </div>
  );
}

export default Customer;

function CustomerSearchInput() {
  return (
    <div className="flex items-center gap-3 bg-white border-b-2 border-b-raisin-black rounded-md p-3">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search customers...."
        className="flex-1 border-none focus:outline-none bg-transparent"
      />
    </div>
  );
}
