import React, { useState } from "react";
import Tabs from "../components/common/Tabs";
import { Search } from "lucide-react";
import CommonTable from "../components/common/CommonTable";
import { createColumnHelper } from "@tanstack/react-table";
import OrderSidebar from "../components/order/OrderSidebar";
import Radiobutton from "../components/common/Radiobutton";
import moment from "moment";

function Order() {
  const [currentTab, setCurrentTab] = useState("Order History");
  const [selected, setSelected] = useState("0");

  const columnHelper = createColumnHelper();

  function generateObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    ).toLowerCase();
  }

  function generateOrders(numOrders) {
    const customers = [
      "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Bob Brown",
      "Charlie Davis",
    ];
    const orders = [];

    for (let i = 1; i <= numOrders; i++) {
      const order = {
        id: generateObjectId(),
        customerName: customers[Math.floor(Math.random() * customers.length)],
        orderDate: new Date(
          2024,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1,
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 60)
        )
          .toISOString()
          .replace("T", " ")
          .split(".")[0],
        total: (Math.random() * 500).toFixed(2),
      };
      orders.push(order);
    }

    return orders;
  }

  const orderArray = generateOrders(10);
  console.log(orderArray);

  const tabs = [
    "Order History",
    "Hold Orders",
    "Online orders",
    "Cancel Orders",
    "Offline Orders",
  ];

  const column = [
    columnHelper.accessor("id", {
      header: "Select",
      enableSorting: false,
      cell: (info) => (
        <div
          className="flex
         justify-center"
        >
          <Radiobutton
            index={info.row.index}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      ),
    }),
    columnHelper.accessor("id", {
      header: "ID",
      enableSorting: false,
      cell: (info) => (
        <div>
          <p>{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("customerName", {
      header: "Customer name",
      enableSorting: true,
      cell: (info) => (
        <div>
          <p>{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("orderDate", {
      header: "Date",
      enableSorting: true,
      cell: (info) => (
        <div>
          <p>{moment(info.getValue()).format("L")}</p>
        </div>
      ),
    }),
    columnHelper.accessor("orderDate", {
      header: "Time",
      enableSorting: true,
      cell: (info) => (
        <div>
          <p>{moment(info.getValue()).format("LTS")}</p>
        </div>
      ),
    }),
    columnHelper.accessor("total", {
      header: "Total ( Rs. )",
      enableSorting: true,
      cell: (info) => (
        <div>
          <p>{info.getValue()}</p>
        </div>
      ),
    }),
  ];

  return (
    <div className="w-full h-full bg-culture-white rounded-lg shadow-sm flex gap-2">
      <div className="flex-1 flex flex-col gap-2 w-full bg-linen shadow-sm p-2">
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          bigTabs
        />
        <OrderSearchInput />
        <CommonTable data={orderArray} columns={column} />
      </div>
      <OrderSidebar />
    </div>
  );
}

export default Order;

function OrderSearchInput() {
  return (
    <div className="flex items-center gap-3 bg-white border-b-2 border-b-raisin-black rounded-md p-3">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search order Ids or customers."
        className="flex-1 border-none focus:outline-none bg-transparent"
      />
    </div>
  );
}
