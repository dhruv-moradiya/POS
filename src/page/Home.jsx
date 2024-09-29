import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { getDishes } from "../store/dishSlice/DishThunk";
import { getAllCustomers } from "../store/customerSlice/CustomerThunk";
import { getOrders } from "../store/orderSlice/OrderThunk";
import { getTables } from "../store/tableSlice/TableThunk";
import Card from "../components/common/Card";
import HomeSidebar from "../components/home/homeSidebar/HomeSidebar";
import DishDetails from "../components/home/DishDetails";
import AddDishForm from "../components/home/homeSidebar/AddDishForm";
import Tabs from "../components/common/Tabs";

function Home() {
  const [currentTab, setCurrentTab] = useState("All");
  const [isAddDishFormOpen, setIsAddDishFormOpen] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState([]);

  const dispatch = useDispatch();

  const {
    dish: { dishes, isDishesLoading },
    customers: { customers, isCustomerLoading },
    order: { orders },
  } = useSelector((state) => state);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(getDishes());
    dispatch(getAllCustomers());
    dispatch(getOrders());
    dispatch(getTables());
  }, [dispatch]);

  // Filter dishes by category based on the current tab
  useEffect(() => {
    filterDishesByCategory();
  }, [currentTab, dishes]);

  const filterDishesByCategory = () => {
    if (currentTab === "All") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(
        (dish) => dish.type.toUpperCase() === currentTab.toUpperCase()
      );
      setFilteredDishes(filtered);
    }
  };

  return (
    <div className="w-full flex gap-2 rounded-lg">
      <div className="flex-1 flex flex-col gap-2 rounded-md">
        {/* Tabs and Add Dish Button */}
        <HeaderSection
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          setIsAddDishFormOpen={setIsAddDishFormOpen}
        />

        {/* Dish Cards Grid */}
        <div className="scrollbar w-full h-full bg-linen px-3 shadow-sm flex justify-center overflow-auto">
          <DishGrid
            isLoading={isDishesLoading}
            dishes={filteredDishes}
            setSelectedDishId={setSelectedDishId}
          />
        </div>
      </div>

      {/* Sidebar with Customer Info */}
      <HomeSidebar
        dishes={dishes}
        customers={customers}
        isCustomerLoading={isCustomerLoading}
      />

      {/* Modals for Add Dish Form and Dish Details */}
      {isAddDishFormOpen && (
        <AddDishForm setOpenAddDishForm={setIsAddDishFormOpen} />
      )}
      {selectedDishId && (
        <DishDetails
          dish={dishes.find((dish) => dish._id === selectedDishId)}
          setShowDishDetails={setSelectedDishId}
        />
      )}
    </div>
  );
}

export default Home;

// Header section with tabs and button
function HeaderSection({ currentTab, setCurrentTab, setIsAddDishFormOpen }) {
  const tabs = [
    "All",
    "Starter",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Beverages",
  ];

  return (
    <div className="flex items-center justify-between py-1 bg-linen shadow-sm">
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <button
        className="bg-amber-sea text-white text-xs font-semibold px-4 rounded-md flex items-center gap-2 py-2"
        onClick={() => setIsAddDishFormOpen(true)}
      >
        <Plus size={16} />
        Add Dish
      </button>
    </div>
  );
}

// Grid to display dish cards or loading skeletons
function DishGrid({ isLoading, dishes, setSelectedDishId }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (dishes.length === 0) {
    return <p>No dishes found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {dishes.map((dish) => (
        <Card
          key={dish._id}
          setShowDishDetails={setSelectedDishId}
          dish={dish}
        />
      ))}
    </div>
  );
}

// Skeleton for loading state
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
