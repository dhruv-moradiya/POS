import { motion } from "framer-motion";
import { ChevronRight, CircleX, Trash2Icon } from "lucide-react";
import Model from "./Model";
import useSubmitOnClick from "../../hooks/useSubmitOnClick";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateOrderedDishQuantityOrDiscount } from "../../store/orderSlice/OrderSlice";

const OrderItems = ({ orderId, items, selectedOrder, setSelectedOrder }) => {
  const { response, error, loading, postData } = useSubmitOnClick();
  const dispatch = useDispatch();

  const {
    dish: { dishes, isDishesLoading, isErrorInDishes },
    customers: { customers, isCustomerLoading, isErrorInCustomer },
    order: { orders, isOrderLoading, isErrorInOrder },
  } = useSelector((state) => state);

  function selectOrder(e, item) {
    e.stopPropagation();
    setSelectedOrder(selectedOrder === item.dish.id ? null : item.dish.id);
  }

  const updateDish = async (dishId, data) => {
    try {
      const result = await postData(
        `order/update_item/${orderId}`,
        { dishId, ...data },
        "patch"
      );
      if (result) {
        dispatch(
          updateOrderedDishQuantityOrDiscount({
            id: orderId,
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
    <ul className="w-full flex flex-col gap-2">
      {items.map((item) => (
        <motion.li
          key={item.id}
          className="pl-6 px-3 py-2 w-full bg-culture-white flex flex-col items-center justify-between gap-2 rounded-md cursor-pointer relative"
          onClick={(e) => selectOrder(e, item)}
          initial={{ borderLeftWidth: 0 }}
          animate={{
            borderLeftWidth: selectedOrder === item.dish.id ? 4 : 0,
            borderLeftColor: "#09AA20",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-full flex items-center gap-2">
            <motion.button
              animate={{ rotate: selectedOrder === item.id ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ChevronRight size={18} />
            </motion.button>
            <p className="flex-1">{item.dish.name}</p>
            <p>₹{item.dish.price}</p>
            <p>
              <CircleX size={16} />
            </p>
          </div>
          {selectedOrder === item.dish.id && (
            <Model
              quantity={item.qty}
              discount={item.discount}
              isLoading={loading}
              onSubmit={(data) => updateDish(item.dish.id, data)}
            />
          )}
        </motion.li>
      ))}
    </ul>
  );
};
export default OrderItems;
