import React from "react";
import { motion } from "framer-motion";

function PaymentInfo() {
  return (
    <div className="scrollbar w-[500px] max-h-[550px] absolute top-10 left-1/2 -translate-x-1/2 bg-culture-white p-4 rounded-md shadow">
      <h3 className="text-xl font-semibold text-center mb-6">Invoice</h3>
      <table className="w-full">
        <thead>
          <tr className="text-start">
            <th className="text-start">Item</th>
            <th className="text-start">Quantity</th>
            <th className="text-start">Price</th>
            <th className="text-start">Discount</th>
            <th className="text-start">Total</th>
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(0).map((_, index) => (
            <tr key={index} className={`text-start border-b-[1px]`}>
              <td className="text-start py-1 ">Item {index + 1}</td>
              <td className="text-start py-1 ">1</td>
              <td className="text-start py-1 ">$10.00</td>
              <td className="text-start py-1 ">10.00 %</td>
              <td className="text-start py-1 ">$10.00</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4">
        <p className="font-semibold mt-2"> Discount: $100.00</p>
        <p className="font-semibold mt-2"> Tax: $100.00</p>
        <p className="font-semibold mt-2">Total: $100.00</p>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <motion.button
          className="bg-amber-sea font-semibold text-white px-4 py-2 rounded-md shadow hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p>Pay</p>
        </motion.button>
        <motion.button
          className="bg-green-600 font-semibold text-white px-4 py-2 rounded-md shadow hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p>Print</p>
        </motion.button>
        <motion.button
          className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p>Cancel</p>
        </motion.button>
      </div>
    </div>
  );
}

export default PaymentInfo;
