import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightFromLine, Filter, Plus, SquareMinus } from "lucide-react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import CustomerDetails from "../../common/CustomerDetails";
import AddNewCustomer from "../../common/AddNewCustomer";
import html2canvas from "html2canvas";
import Button from "../../common/Button";
import Input from "../../common/Input";
import useCancelOrder from "../../../hooks/useCancelOrder";
import useGeneratePDF from "../../../hooks/useGeneratePDF";

function HomeSidebar({ dishes, customers, isCustomerLoading }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openCustomerAddModel, setCustomerAddModel] = useState(false);

  const { orders, isOrderLoading, isErrorInOrder } = useSelector(
    (state) => state.order
  );

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("generated.pdf");
    });
  };

  return (
    <div
      className="w-[480px] bg-linen rounded-md shadow-sm p-2 flex flex-col justify-between relative"
      id="pdf-content"
    >
      {/* Sidebar Header */}
      <HomeSidebarHeader setCustomerAddModel={setCustomerAddModel} />

      {/* Order List */}
      <OrderList
        orders={orders}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />

      {/* Footer with Customer Details and payment info */}
      <HomeSidebarFooter orders={orders} selectedCustomer={selectedCustomer} />

      {/* Add Customer Modal */}
      {openCustomerAddModel && (
        <AddNewCustomer setCustomerAddModel={setCustomerAddModel} />
      )}
    </div>
  );
}

export default HomeSidebar;

// Header section with input and buttons
function HomeSidebarHeader({ setCustomerAddModel }) {
  return (
    <div className="w-full flex items-center justify-between">
      <Button
        icon={Plus}
        label="Add Customer"
        onClick={() => setCustomerAddModel(true)}
        className="space-x-2"
      />
      <Input placeholder="Search Customer..." className="w-44" />
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
      <Button icon={Filter} />
    </div>
  );
}

// List of Orders
function OrderList({ orders, selectedCustomer, setSelectedCustomer }) {
  const [selectedOrderedDish, setSelectedOrderedDish] = useState(null);
  const { cancelOrder } = useCancelOrder();

  const sortedOrderArray = [...orders].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
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
  );
}

// Footer section with total amount
function HomeSidebarFooter({ selectedCustomer, orders }) {
  const selectedCustomerPaymentInfo =
    selectedCustomer && orders.find((order) => order._id === selectedCustomer);

  const { generatePDF } = useGeneratePDF();

  return (
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
  );
}
