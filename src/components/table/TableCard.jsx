import { Check } from "lucide-react";
import React from "react";

function TableCard({ table, setOpenTableInfo, setCurrentCustomerInfo }) {
  const borderColor = table.isOccupied ? "border-red-500" : "border-green-500";

  function tableInfo() {
    setOpenTableInfo({
      isOpen: true,
      table_id: table._id,
      currentCustomerId: table.currentCustomerId,
    });
    setCurrentCustomerInfo({
      ...(table.currentCustomer || {}),
      ...(table.currentOrderInfo || {}),
      customerId: table.currentCustomer?._id,
      orderId: table.currentOrderInfo?._id,
    });

    console.log("table :>> ", table);

    if (!table.isOccupied) {
    }
  }

  return (
    <div className="relative" onClick={tableInfo}>
      <div
        className={`w-[180px] h-[180px] overflow-hidden bg-white rounded-md border-b-4 shadow-sm cursor-pointer hover:shadow-md ${borderColor}`}
      >
        <img
          src={table.capacity === 10 ? "/table_2.png" : "/table_1.png"}
          alt="12"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-culture-white px-2 rounded shadow flex items-center gap-2">
        <span>{table?.currentCustomer?.name}</span>

        <span>
          {table?.currentCustomer?.name && table?.currentOrderInfo && (
            <Check size={14} />
          )}
        </span>
      </div>
    </div>
  );
}

export default TableCard;
