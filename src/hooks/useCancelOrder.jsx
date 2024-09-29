import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cancelOrder as cancelOrderAction } from "../store/orderSlice/OrderSlice";

function useCancelOrder() {
  const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
  const TOKEN =
    JSON.parse(localStorage.getItem("user_info"))?.accessToken || "";

  const dispatch = useDispatch();

  async function cancelOrder(id) {
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

  return { cancelOrder };
}

export default useCancelOrder;
