import React, { useEffect, useState } from "react";
import TableCard from "../components/table/TableCard";
import Tabs from "../components/common/Tabs";
import { Backpack } from "lucide-react";
import { motion } from "framer-motion";
import OccupiedTableInfo from "../components/table/OccupiedTableInfo";
import { useDispatch, useSelector } from "react-redux";
import { getTables } from "../store/tableSlice/TableThunk";
import SelectTableAndPlaceOrder from "../components/table/SelectTableAndPlaceOrder";
import { getDishes } from "../store/dishSlice/DishThunk";
import { getOrders, getTodaysOrders } from "../store/orderSlice/OrderThunk";

const tabs = ["All Table", "Vacant", "Occupied", "Disable"];
const description = [
  { title: "Occupied", color: "bg-red-500" },
  { title: "Order on hold", color: "bg-blue-500" },
  { title: "Vacant", color: "bg-green-500" },
];

function Table() {
  const [currentTab, setCurrentTab] = useState("All Table");
  const [
    isOpenSelectTableAndPlaceOrderModel,
    setIsOpenSelectTableAndPlaceOrderModel,
  ] = useState(false);
  const [openTableInfo, setOpenTableInfo] = useState({
    isOpen: false,
    table_id: "",
  });
  const [currentCustomerInfo, setCurrentCustomerInfo] = useState(null);

  const dispatch = useDispatch();

  const {
    dish: { dishes, isDishesLoading, isErrorInDishes },
    table: { tables, isTableLoading, isErrorInTable },
    order: { orders, isOrderLoading, isErrorInOrder },
  } = useSelector((state) => state);

  // console.log("orders :>> ", orders);
  console.log("tables :>> ", tables);

  useEffect(() => {
    dispatch(getTables());
    dispatch(getDishes());
    dispatch(getTodaysOrders());
  }, []);

  return (
    <div className="w-full h-full  rounded-lg overflow-hidden flex flex-col gap-2 relative">
      <div className="w-full bg-linen shadow-sm ">
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <div className="w-fill h-full p-3 bg-linen grid grid-cols-5 place-items-center rounded-md">
        {tables?.map((table) => {
          return (
            <TableCard
              key={table._id}
              table={table}
              setOpenTableInfo={setOpenTableInfo}
              setCurrentCustomerInfo={setCurrentCustomerInfo}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between bg-linen p-3 py-6 shadow">
        <div className="flex items-center gap-4">
          {description.map((item, index) => {
            return (
              <div className="flex items-center gap-3" key={index}>
                <div
                  className={`w-[30px] h-[30px] rounded-full ${item.color}`}
                />
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <p className="font-semibold">Table 42</p>
          <motion.button
            className="bg-amber-sea text-white text-base font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setIsOpenSelectTableAndPlaceOrderModel(true)}
          >
            <Backpack size={18} />
            <p> Select & Place Order</p>
          </motion.button>
        </div>
      </div>
      {openTableInfo.isOpen && (
        <OccupiedTableInfo
          tables={tables}
          openTableInfo={openTableInfo}
          setOpenTableInfo={setOpenTableInfo}
          currentCustomerInfo={currentCustomerInfo}
        />
      )}
      {isOpenSelectTableAndPlaceOrderModel && (
        <SelectTableAndPlaceOrder
          close={setIsOpenSelectTableAndPlaceOrderModel}
          tables={tables}
        />
      )}
    </div>
  );
}

export default Table;
