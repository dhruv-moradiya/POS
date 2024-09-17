import { motion } from "framer-motion";
import moment from "moment";
import { ChevronRight, CircleX } from "lucide-react";
import OrderItems from "./OrderItems";

const CustomerDetails = ({
  detail,
  isOpen,
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <>
      <div className="w-full flex items-center gap-3">
        <motion.button
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronRight size={18} />
        </motion.button>
        <div
          className={`w-2 h-2 rounded-full ${
            !detail.customer_info.isOnline ? "bg-amber-sea" : "bg-green-500"
          }  `}
        />
        <p>1</p>
        <p className="flex-1">{detail.customer_info.name}</p>
        <p className="text-xs font-semibold">
          {moment(detail.createdAt).startOf("hour").fromNow()}
        </p>
        <p className="">₹{detail?.totalAmount}</p>
        <p>
          <CircleX size={16} />
        </p>
      </div>
      {isOpen && (
        <OrderItems
          orderId={detail.id}
          items={detail.items}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}
    </>
  );
};

export default CustomerDetails;
