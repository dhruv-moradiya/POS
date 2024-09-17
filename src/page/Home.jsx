import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";
import Tabs from "../components/home/Tabs";
import HomeSidebar from "../components/home/homeSidebar/HomeSidebar";
import DishDetails from "../components/home/DishDetails";
import AddDishForm from "../components/home/homeSidebar/AddDishForm";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../store/dishSlice/DishThunk";
import { getAllCustomers } from "../store/customerSlice/CustomerThunk";
import { getOrders } from "../store/orderSlice/OrderThunk";
import { AnimatePresence } from "framer-motion";
import AddNewCustomer from "../components/common/AddNewCustomer";
import { getTables } from "../store/tableSlice/TableThunk";

function Home() {
  const [currentTab, setCurrentTab] = useState("All");
  const [openAddDishForm, setOpenAddDishForm] = useState(false);
  const [showDishDetails, setShowDishDetails] = useState(null);
  const [filterDishesByCategory, setFilterDishesByCategory] = useState([]);
  // const [selectedDish, setSelectedDish] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDishes());
    dispatch(getAllCustomers());
    dispatch(getOrders());
    dispatch(getTables());
  }, []);

  const {
    dish: { dishes, isDishesLoading, isErrorInDishes },
    customers: { customers, isCustomerLoading, isErrorInCustomer },
    order: { orders, isOrderLoading, isErrorInOrder },
  } = useSelector((state) => state);

  console.log("orders :>> ", orders);

  useEffect(() => {
    if (currentTab === "All") {
      setFilterDishesByCategory(dishes);
    } else {
      setFilterDishesByCategory(
        dishes.filter(
          (dish) => dish.type.toUpperCase() === currentTab.toUpperCase()
        )
      );
    }
  }, [currentTab, dishes]);

  return (
    <div className="w-full rounded-lg flex gap-2">
      <div className="flex-1 flex flex-col gap-2 rounded-md">
        <div className="flex items-center justify-between py-1 bg-linen shadow-sm">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <button
            className="bg-amber-sea text-white text-xs font-semibold px-4 rounded-md flex items-center gap-2 py-2"
            onClick={() => setOpenAddDishForm(true)}
          >
            <Plus size={16} />
            Add Dish
          </button>
        </div>
        <div className="scrollbar w-full h-full bg-linen px-3 shadow-sm flex justify-center overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {isDishesLoading ? (
              Array(10)
                .fill(0)
                .map((_, index) => <CardSkeleton key={index} />)
            ) : dishes.length > 0 ? (
              filterDishesByCategory.map((dish) => (
                <Card
                  key={dish._id}
                  setShowDishDetails={setShowDishDetails}
                  dish={dish}
                />
              ))
            ) : (
              <p>No dishes found</p>
            )}
          </div>
        </div>
      </div>
      <HomeSidebar
        dishes={dishes}
        customers={customers}
        isCustomerLoading={isCustomerLoading}
      />
      {openAddDishForm && (
        <AddDishForm setOpenAddDishForm={setOpenAddDishForm} />
      )}
      {showDishDetails && (
        <DishDetails
          showDishDetails={showDishDetails}
          setShowDishDetails={setShowDishDetails}
          dish={dishes.find((dish) => dish._id === showDishDetails)}
        />
      )}
    </div>
  );
}

export default Home;

function CardSkeleton() {
  return (
    <div className="w-[180px] h-[250px] bg-culture-white rounded-md p-3 flex flex-col gap-2 items-center justify-between relative shadow cursor-pointer">
      <div className="animate-pulse w-full h-full bg-gray-300 rounded-md overflow-hidden" />

      <div className="w-full flex flex-col items-center justify-evenly mt-2">
        <p className="animate-pulse w-full h-4 bg-gray-300 rounded-md"></p>
        <p className="animate-pulse w-1/3 h-4 bg-gray-300 rounded-md mt-2"></p>
      </div>
    </div>
  );
}
