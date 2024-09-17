import { Dot } from "lucide-react";
import React from "react";

function OrderSidebar() {
  const dishes = [
    { dish_name: "Pasta Alfredo", price: 12.99, quantity: 2 },
    { dish_name: "Margherita Pizza", price: 10.99, quantity: 1 },
    { dish_name: "Caesar Salad", price: 8.49, quantity: 3 },
    { dish_name: "Grilled Chicken Sandwich", price: 11.99, quantity: 2 },
    { dish_name: "Beef Tacos", price: 9.99, quantity: 4 },
    { dish_name: "Fish and Chips", price: 14.49, quantity: 1 },
    { dish_name: "BBQ Ribs", price: 18.99, quantity: 2 },
    { dish_name: "Vegetable Stir Fry", price: 11.49, quantity: 3 },
    { dish_name: "Chicken Curry", price: 13.99, quantity: 2 },
    { dish_name: "Lamb Kebabs", price: 16.99, quantity: 1 },
    { dish_name: "Pancakes", price: 7.99, quantity: 3 },
    { dish_name: "Cheeseburger", price: 10.49, quantity: 2 },
    { dish_name: "Sushi Platter", price: 21.99, quantity: 1 },
    { dish_name: "Tomato Soup", price: 5.99, quantity: 4 },
    { dish_name: "Chicken Caesar Wrap", price: 9.49, quantity: 2 },
    { dish_name: "Spaghetti Bolognese", price: 12.49, quantity: 3 },
    { dish_name: "Buffalo Wings", price: 8.99, quantity: 4 },
    { dish_name: "Greek Salad", price: 7.49, quantity: 3 },
    { dish_name: "Eggplant Parmesan", price: 13.49, quantity: 2 },
    { dish_name: "Chocolate Cake", price: 6.99, quantity: 1 },
  ];

  const total = [
    {
      label: "Subtotal",
      amount: 200,
    },
    {
      label: "Tax",
      amount: 200,
    },
    {
      label: "Discount",
      amount: 200,
    },
    {
      label: "GrandTotal",
      amount: 200,
    },
  ];

  return (
    <div className="w-[580px] bg-linen p-2 rounded shadow-sm flex flex-col gap-2">
      <div className="w-full flex items-center justify-between px-5">
        <div className="flex-1 flex flex-col gap-1">
          <h2 className="font-semibold text-xl">Order ID: 459ERT490343GG </h2>
          <p>Customer: John Doe</p>
        </div>
        <div className="self-end flex items-center text-[14px] font-semibold text-amber-sea">
          <p>Dine in</p>
          <Dot />
          <p>Table 3</p>
        </div>
      </div>

      <ul className="scrollbar flex-1 overflow-y-auto shadow rounded">
        <li className="flex items-center justify-between p-1 px-2 my-1">
          <div className="flex items-center gap-2">
            <p></p>
            <p className="font-semibold">Dish Name</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold w-[40px] text-start">Qtn</p>
            <p className="font-semibold w-[60px] text-start">Price</p>
          </div>
        </li>
        {dishes.map((dish, index) => {
          return (
            <li
              key={index}
              className={`flex items-center justify-between p-1 px-2 my-1 rounded shadow
                 ${index % 2 === 0 ? "bg-white" : "bg-culture-white"}`}
            >
              <div className="flex items-center gap-2">
                <p>{index + 1}</p>
                <p>{dish.dish_name}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold w-[40px] text-start">{1}</p>
                <p className="font-semibold w-[60px] text-start">
                  ${dish.price}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex-shrink-0 p-2 shadow rounded-lg bg-culture-white">
        {total.map((item, index) => {
          return (
            <div className="flex items-center justify-between my-1" key={index}>
              <p className="font-semibold">{item.label}:</p>
              <p>${item.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderSidebar;
