import { motion } from "framer-motion";
import moment from "moment";
import { ChevronRight, CircleX } from "lucide-react";
import OrderItems from "./OrderItems";
import { getStatusIcon } from "../../utility/helper";

const CustomerDetails = ({
  detail,
  isOpen,
  selectedOrderedDish,
  setSelectedOrderedDish,
  cancelOrder,
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <motion.button
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronRight size={18} />
          </motion.button>
          <div
            className={`w-2 h-2 mx-2 rounded-full ${
              !detail.customer_info?.isOnline ? "bg-amber-sea" : "bg-green-500"
            }  `}
          />
          <p className="flex-1 mx-1">{detail.customer_info.name}</p>
          <p className="text-xs font-semibold mx-1">
            {moment(detail.updatedAt).fromNow()}
          </p>
          <p className="mx-2">₹{detail?.totalAmount}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              cancelOrder(detail._id);
            }}
          >
            <CircleX size={16} />
          </button>
        </div>
        <div className="self-end flex items-center gap-4 text-xs font-semibold ml-5">
          <p className="flex items-center gap-1">
            <span>{getStatusIcon(detail.status)}</span>
            <span>{detail.status}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>{getStatusIcon(detail.paymentStatus)}</span>
            <span>{detail.paymentStatus}</span>
          </p>
        </div>
      </div>
      {isOpen && (
        <OrderItems
          orderId={detail.id}
          items={detail.items}
          selectedOrderedDish={selectedOrderedDish}
          setSelectedOrderedDish={setSelectedOrderedDish}
        />
      )}
    </>
  );
};

export default CustomerDetails;
