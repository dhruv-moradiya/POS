import React, { useEffect, useMemo, useState } from "react";
import AddNewDishModel from "./AddNewDishModel";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../store/dishSlice/DishThunk";

function SelectTableAndPlaceOrder({ close, tables }) {
  const [openAddNewDishModel, setOpenAddNewDishModel] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  function handleTableClick(id) {
    setOpenAddNewDishModel(true);
    setSelectedTable(id);
  }

  return (
    <div className="bg-culture-white p-3 rounded-md shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold">Select table and place order</h3>

      <div className="flex items-center gap-3">
        {tables.map((table, index) => (
          <div
            key={table._id}
            className={`w-[130px] h-[130px] rounded-md px-1 ${
              selectedTable === table._id
                ? "border-[2px] border-amber-sea"
                : "border-[2px] border-transparent"
            } text-amber-sea bg-amber-sea/10 flex flex-col items-center justify-center gap-2 text-center break-all cursor-pointer hover:bg-amber-sea/20`}
            onClick={() => handleTableClick(table._id)}
          >
            <span>{table._id}</span>
            <span> Capacity: {table.capacity}</span>
          </div>
        ))}
      </div>

      {openAddNewDishModel && (
        <AddNewDishModel
          setOpenAddNewDishModel={setOpenAddNewDishModel}
          position
        />
      )}
      <button
        className="p-2 bg-linen rounded-full shadow hover:shadow-lg cursor-pointer absolute top-2 right-2"
        onClick={() => close(false)}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default SelectTableAndPlaceOrder;
