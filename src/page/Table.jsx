import React, { useEffect, useState } from "react";
import { Backpack, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getTables } from "../store/tableSlice/TableThunk";
import { getDishes } from "../store/dishSlice/DishThunk";
import { getOrders, getTodaysOrders } from "../store/orderSlice/OrderThunk";
import TableCard from "../components/table/TableCard";
import Tabs from "../components/common/Tabs";
import OccupiedTableInfo from "../components/table/OccupiedTableInfo";
import SelectTableAndPlaceOrder from "../components/table/SelectTableAndPlaceOrder";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { OrderData } from "../../data";
import CommonTable from "../components/common/CommonTable";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import Radiobutton from "../components/common/Radiobutton";

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

  console.log("tables :>> ", tables);

  useEffect(() => {
    dispatch(getTables());
    dispatch(getDishes());
    dispatch(getOrders());
  }, []);

  return (
    <div className="w-full h-full  rounded-lg overflow-hidden flex flex-col gap-2 relative">
      <ExpandableTable tables={tables} />
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

function ExpandableTable({ tables }) {
  const [selected, setSelected] = useState("0");

  const columnHelper = createColumnHelper();
  const column2 = [
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

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "Table ID",
        enableSorting: false,
        cell: (info) => <p>{info.getValue()}</p>,
      }),
      columnHelper.accessor("tableName", {
        header: "Table Name",
        enableSorting: false,
        cell: (info) => <p>{info.getValue()}</p>,
      }),
      columnHelper.accessor("capacity", {
        header: "Capacity",
        enableSorting: false,
        cell: (info) => <p>{info.getValue()}</p>,
      }),
      columnHelper.accessor("isOccupied", {
        header: "Occupied",
        enableSorting: false,
        cell: (info) => <p>{info.getValue() ? "true" : "false"}</p>,
      }),
      columnHelper.accessor("currentCustomerId", {
        header: "Name",
        enableSorting: false,
        cell: (info) => {
          const row = info.row.original;
          const customerName = row.isOccupied
            ? row.currentCustomer.name
            : row.currentCustomerId;
          return <p>{customerName ?? "-"}</p>;
        },
      }),
      columnHelper.display({
        id: "expand",
        header: "Expand",
        cell: ({ row }) => (
          <button
            onClick={() => {
              console.log("object");
              row.getToggleExpandedHandler();
            }}
            className="text-blue-500"
          >
            {row.getIsExpanded() ? "Collapse" : "Expand"}
          </button>
        ),
      }),
    ],
    []
  );

  return (
    <CommonTable
      data={tables}
      columns={columns}
      expandRowContent={({ row }) => (
        <tr>
          <td colSpan={columns.length} className="px-4 py-2 bg-gray-100">
            <div>
              <p>Details about {row.original.dishName}</p>
              <CommonTable data={OrderData} columns={column2} />
            </div>
          </td>
        </tr>
      )}
    />
  );
}
