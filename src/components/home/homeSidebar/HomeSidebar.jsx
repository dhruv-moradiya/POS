import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightFromLine,
  ChevronRight,
  Filter,
  Pause,
  Plus,
  SquareMIcon,
  SquareMinus,
  Trash2Icon,
} from "lucide-react";
import CustomerDetails from "../../common/CustomerDetails";
import { useDispatch, useSelector } from "react-redux";
import AddNewCustomer from "../../common/AddNewCustomer";
import useSubmitOnClick from "../../../hooks/useSubmitOnClick";
import { cancelOrder as cancelOrderAction } from "../../../store/orderSlice/OrderSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

function HomeSidebar({ dishes, customers, isCustomerLoading }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrderedDish, setSelectedOrderedDish] = useState(null);
  const [openCustomerAddModel, setCustomerAddModel] = useState(false);
  const { response, error, loading, postData } = useSubmitOnClick();
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
  const TOKEN =
    JSON.parse(localStorage.getItem("user_info"))?.accessToken || "";

  const { orders, isOrderLoading, isErrorInOrder } = useSelector(
    (state) => state.order
  );
  const sortedOrderArray = [...orders].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const selectedCustomerPaymentInfo =
    selectedCustomer && orders.find((order) => order._id === selectedCustomer);

  console.log("orders :>> ", orders);

  async function cancelOrder(id) {
    console.log("id :>> ", id);

    try {
      const cancelRequest = axios({
        method: "patch",
        url: `${BASE_URL}/order/cancel/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const response = await toast.promise(cancelRequest, {
        loading: "Canceling the order...",
        success: "Order canceled successfully!",
        error: (err) => {
          if (err.response && err.response.data && err.response.data.message) {
            return err.response.data.message;
          }
          return "Failed to cancel the order. Please try again.";
        },
      });

      if (response.data && response.data.updatedOrder) {
        dispatch(cancelOrderAction(response.data.updatedOrder));
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
    }
  }

  return (
    <div className="w-[480px] bg-linen rounded-md shadow-sm p-2 flex flex-col justify-between relative">
      <div className="w-full flex items-center justify-between">
        <motion.button
          className="flex items-center gap-2 px-2 py-2 bg-culture-white rounded-lg shadow hover:shadow-md mb-3 font-semibold text-xs"
          whileTap={{
            scale: 0.95,
            backgroundColor: "rgba(230, 230, 230, 0.8)",
          }}
          onClick={() => setCustomerAddModel(true)}
        >
          <Plus size={18} />
          <p>Add Customer</p>
        </motion.button>
        <input
          type="text"
          placeholder="Search Customer..."
          className="px-3 py-1 border-2 border-raisin-black/50 rounded-lg focus:outline-none placeholder:text-xs"
        />
        <div className="text-xs">
          <div className="flex items-center gap-1">
            <p className="font-semibold">Online</p>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <div className="flex items-center gap-1">
            <p className="font-semibold">Offline</p>
            <div className="w-2 h-2 bg-amber-sea rounded-full" />
          </div>
        </div>
        <motion.button
          className="px-2 py-2 bg-culture-white rounded-lg shadow hover:shadow-md mb-3 font-semibold text-xs"
          whileTap={{
            scale: 0.95,
            backgroundColor: "rgba(230, 230, 230, 0.8)",
          }}
        >
          <Filter size={18} />
        </motion.button>
      </div>
      <ul className="scrollbar flex-1 w-full flex flex-col gap-2 mb-3 overflow-y-auto">
        {sortedOrderArray
          ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((order, index) => (
            <motion.li
              key={order.id}
              className="w-full bg-culture-white flex flex-col justify-between gap-1 px-4 py-2 rounded-md shadow-sm cursor-pointer relative"
              onClick={() =>
                setSelectedCustomer(
                  selectedCustomer === order.id ? null : order.id
                )
              }
              initial={{ borderLeftWidth: 0, height: "60px" }}
              animate={{
                borderLeftWidth: selectedCustomer === order.id ? 4 : 0,
                borderLeftColor: "#09AA20",
                height: selectedCustomer === order.id ? "auto" : "70px",
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(245, 245, 245, 1)"
                    : "rgba(230, 230, 230, 0.8)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CustomerDetails
                detail={order}
                isOpen={selectedCustomer === order.id}
                selectedOrderedDish={selectedOrderedDish}
                setSelectedOrderedDish={setSelectedOrderedDish}
                cancelOrder={cancelOrder}
              />
            </motion.li>
          ))}
      </ul>
      <div className="w-full px-6 py-2 bg-culture-white rounded-md flex flex-col gap-2 shadow">
        <div className="w-full flex items-center justify-between">
          <p className="flex-1 text-[15px] font-semibold">Subtotal</p>
          <p className="text-[15px] font-semibold">
            ${selectedCustomerPaymentInfo?.totalAmount || 0}
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="flex-1 text-[15px] font-semibold">Tax</p>
          <p className="text-[15px] font-semibold">$100</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="flex-1 text-xl font-semibold">Total</p>
          <p className="text-xl font-semibold">
            ${selectedCustomerPaymentInfo?.totalAmount + 100 || 0}
          </p>
        </div>
        <div className="flex items-center justify-evenly">
          <motion.button
            className="bg-amber-sea font-semibold text-white text-xs px-4 py-2 rounded-md flex items-center gap-3 shadow hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SquareMinus />
            <p>Hold Card</p>
          </motion.button>
          <motion.button
            className="bg-green-600 font-semibold text-white text-xs px-4 py-2 rounded-md flex items-center gap-3 shadow hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRightFromLine />
            <p>Proceed</p>
          </motion.button>
        </div>
      </div>
      {openCustomerAddModel && (
        <AddNewCustomer setCustomerAddModel={setCustomerAddModel} />
      )}
    </div>
  );
}

export default HomeSidebar;
