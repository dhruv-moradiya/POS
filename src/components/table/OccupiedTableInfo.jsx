import { ChevronRight, CircleX, Loader, Plus, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Model from "../common/Model";
import AddNewDishModel from "./AddNewDishModel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";
import CommonTable from "../common/CommonTable";
import toast from "react-hot-toast";
import useSubmitOnClick from "../../hooks/useSubmitOnClick";
import {
  updateOrderedDishQuantityOrDiscount,
  updateOrderList,
} from "../../store/orderSlice/OrderSlice";

function OccupiedTableInfo({
  tables,
  openTableInfo: { isOpen, table_id },
  setOpenTableInfo,
  currentCustomerInfo,
}) {
  const [selectedDish, setSelectedDish] = useState(-1);
  const [openAddNewDishModel, setOpenAddNewDishModel] = useState(false);
  // const { customers, isCustomerLoading, isErrorInCustomer } = useSelector(
  //   (state) => state.customers
  // );

  const {
    dish: { dishes, isDishesLoading, isErrorInDishes },
    customers: { customers, isCustomerLoading, isErrorInCustomer },
    order: { orders, isOrderLoading, isErrorInOrder },
  } = useSelector((state) => state);
  const { response, error, loading, postData } = useSubmitOnClick();

  const dispatch = useDispatch();

  const hasOrder = currentCustomerInfo?.items?.length > 0;
  currentCustomerInfo?.items?.length > 0
    ? currentCustomerInfo.status === "PENDING" || "HOLD"
    : false;

  const updateDish = async (dishId, data) => {
    try {
      console.log("data :>> ", data);
      const result = await postData(
        `order/update_item/${orderId}`,

        { dishId, ...data },
        "patch"
      );
      if (result) {
        dispatch(
          updateOrderedDishQuantityOrDiscount({
            id: currentCustomerInfo.orderId,
            dish: dishId,
            quantity: data.quantity,
            discount: data.discount,
          })
        );
        toast.success(result.message, { position: "top-center" });
      }
    } catch {
      if (error) {
        toast.error(error, { position: "top-center" });
      }
    }
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-culture-white shadow-md rounded-md p-3"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
    >
      {hasOrder ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold">Customer Name:</h3>
              <p>{currentCustomerInfo.name}</p>
            </div>
            <p className="text-amber-sea font-semibold">
              Total Person {currentCustomerInfo.totalPerson}
            </p>
            <button
              className="mr-8 bg-white p-1 rounded-full shadow"
              onClick={() => setOpenAddNewDishModel(true)}
            >
              <Plus size={18} />
            </button>
          </div>

          <ul className="scrollbar bg-culture-white w-[450px] h-96 overflow-y-auto mt-3">
            <li className="flex items-center">
              <h3 className="w-[50px] font-semibold"></h3>
              <h3 className="flex-1 font-semibold">Dish</h3>
              <h3 className="w-[70px] font-semibold text-center">Quantity</h3>
              <h3 className="w-[70px] font-semibold text-center">Price</h3>
              <h3 className="w-[70px] font-semibold text-center">Total</h3>
            </li>
            {currentCustomerInfo.items.map(
              ({ dish, qty, discount }, index, array) => (
                <motion.li
                  key={index}
                  className={`flex flex-col items-center m-1 p-1 rounded-md cursor-pointer shadow-sm hover:shadow-md overflow-hidden ${
                    index % 2 === 0 ? "bg-linen" : "bg-white"
                  }`}
                  onClick={() => setSelectedDish(index)}
                  initial={{ borderLeftWidth: 0, height: "" }}
                  animate={{
                    borderLeftWidth: selectedDish === index ? 4 : 0,
                    borderLeftColor: "#09AA20",
                    height: selectedDish === index ? "auto" : "",
                  }}
                >
                  <div className="w-full flex items-center">
                    <motion.button
                      className="w-[50px] flex items-center justify-center"
                      animate={{ rotate: selectedDish === index ? 90 : 0 }}
                      // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ChevronRight size={16} />
                    </motion.button>
                    <p className="flex-1">{dish.name}</p>
                    <p className="w-[70px] text-center">{qty}</p>
                    <p className="w-[70px] text-center">{dish.price}</p>
                    <p className="w-[70px] text-center">{qty * dish.price}</p>
                  </div>
                  {selectedDish === index && (
                    <div className="mt-2 pb-2">
                      <Model
                        quantity={qty}
                        discount={discount}
                        onSubmit={(data) => updateDish(dish._id, data)}
                        isLoading={loading}
                      />
                    </div>
                  )}
                </motion.li>
              )
            )}
          </ul>
        </>
      ) : (
        <PlaceOrderUi
          dishes={dishes}
          currentCustomerInfo={currentCustomerInfo}
          setOpenTableInfo={setOpenTableInfo}
          tableId={table_id}
        />
      )}
      <div
        className="absolute top-1 right-1 bg-culture-white p-1 rounded-full cursor-pointer shadow hover:shadow-lg"
        onClick={() =>
          setOpenTableInfo((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <X size={18} />
      </div>
      {openAddNewDishModel && (
        <AddNewDishModel
          dishes={dishes}
          setOpenAddNewDishModel={setOpenAddNewDishModel}
        />
      )}
    </motion.div>
  );
}

export default OccupiedTableInfo;

function PlaceOrderUi({
  dishes,
  currentCustomerInfo,
  tableId,
  setOpenTableInfo,
}) {
  const [orderedDishes, setOrderedDishes] = useState([]);
  const [selectDish, setSelectDish] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const columnHelper = createColumnHelper();

  const dispatch = useDispatch();

  async function placeOrder() {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_APP_SERVER_URL}/order`,
        method: "post",
        data: {
          items: orderedDishes.map((dish) => ({
            dish: dish._id,
            qty: dish.qty,
          })),
          customer_id: currentCustomerInfo.customerId,
          tableId,
          orderType: "DINE-IN",
          paymentStatus: "UNPAID",
          totalAmount: orderedDishes.reduce((a, b) => a + b.price * b.qty, 0),
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user_info")).accessToken || ""
          }`,
        },
      });

      if (response.status === 201) {
        toast.success("Order placed successfully");
        setOrderedDishes([]);
        setSelectDish(null);
        setOpenTableInfo({
          isOpen: false,
          table_id: "",
        });
        dispatch(updateOrderList(response.data.order));
      } else {
        toast.error(response.data.message);
      }

      console.log("response :>> ", response);
    } catch (error) {
      console.log("Error while placing order :>> ", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function updateDishQuantity(rowId, newQty) {
    setOrderedDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === rowId ? { ...dish, qty: newQty } : dish
      )
    );
  }

  function removeDish(rowId) {
    setOrderedDishes((prevDishes) =>
      prevDishes.filter((dish) => dish._id !== rowId)
    );
  }

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: "Dish Name",
      enableSorting: false,
      cell: (info) => (
        <div>
          <p>{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("qty", {
      header: "Qty",
      enableSorting: false,
      cell: (info) => (
        <div className="w-full flex justify-center">
          <input
            type="number"
            value={info.getValue()}
            className="w-[40px] bg-transparent"
            onChange={(e) => {
              const newQty = parseInt(e.target.value);
              if (!isNaN(newQty)) {
                updateDishQuantity(info.row.original._id, newQty);
              }
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      enableSorting: false,
      cell: (info) => {
        const qty = info.row.original.qty;
        return (
          <div className="w-full flex justify-center">
            <p>{Number(qty) * Number(info.getValue())}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "Remove",
      enableSorting: false,
      cell: (info) => (
        <button
          className="w-full py-1 flex justify-center cursor-pointer"
          onClick={() => removeDish(info.row.original._id)}
        >
          <CircleX size={17} />
        </button>
      ),
    }),
  ]);

  return (
    <>
      <div className="flex items-center gap-4 mr-6">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Customer Name:</h3>
          <p>{currentCustomerInfo?.name}</p>
        </div>
        <p className="text-amber-sea font-semibold">Total Person: 10 </p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <AddNewDishModel
            dishes={dishes}
            setOrderedDishes={setOrderedDishes}
            setSelectDish={setSelectDish}
            position
          />
        </div>
        {orderedDishes.length > 0 && (
          <div className="flex-2 flex flex-col p-3">
            <h3 className="text-center font-semibold">Order Items</h3>
            <div className="h-full flex flex-col justify-between">
              <div className="scrollbar h-[300px] overflow-y-auto mb-4">
                <CommonTable data={orderedDishes} columns={columns} />
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  className="bg-amber-sea font-semibold text-white text-xs w-[100px] py-2 rounded-md flex items-center justify-center gap-3 shadow hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={placeOrder}
                >
                  <p>
                    {isLoading ? (
                      <div className="animate-spin">
                        <Loader size={16} />
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </p>
                </motion.button>
                <motion.button
                  className="bg-green-600 font-semibold text-white text-xs w-[100px] py-2 rounded-md flex items-center justify-center gap-3 shadow hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p>Cancel</p>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
