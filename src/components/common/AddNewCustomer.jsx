import React from "react";
import Input from "./Input";
import { animate, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import useSubmitOnClick from "../../hooks/useSubmitOnClick";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { updateCustomerList } from "../../store/customerSlice/CustomerSlice";
import { updateCustomerInfo } from "../../store/tableSlice/TableSlice";

function AddNewCustomer({ setCustomerAddModel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const { response, error, loading, postData } = useSubmitOnClick();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { total_person, name, contact_num, email, table_number } = data;

    try {
      const result = await postData(
        "user/create-user",
        {
          isOnline: false,
          totalPerson: total_person,
          name: name,
          contactInfo: contact_num,
          email: email,
          currentTableId: table_number,
        },
        "post"
      );

      if (result) {
        toast.success(result.message, { position: "top-center" });
        setCustomerAddModel(false);

        dispatch(updateCustomerList(result.data.user));
        dispatch(
          updateCustomerInfo({
            table_id: result.data.table,
            isOccupied: true,
            currentCustomer: {
              name: name,
              totalPerson: total_person,
              email: email,
              _id: result.data.user._id,
            },
          })
        );
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: "top-center",
      });
    } finally {
      reset();
    }
  };

  const {
    table: { tables, isTableLoading, isErrorInTable },
  } = useSelector((state) => state);

  console.log("tables :>> ", tables);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 bg-culture-white p-2 rounded-md absolute top-14 left- shadow-md"
    >
      <h3 className="text-xl font-semibold">Add new customer</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w--72 flex flex-col items-center gap-3"
      >
        <Input
          className={`py-[2px] focus:ring-0 ${
            errors.name ? "border-[1px] border-red-400" : ""
          }`}
          placeholder="Customer name"
          {...register("name", { required: true })}
        />
        <Input
          className={`py-[2px] focus:ring-0 ${
            errors.email ? "border-[1px] border-red-400" : ""
          }`}
          placeholder="email"
          {...register("email", { required: true })}
        />

        <Input
          className={`py-[2px] focus:ring-0 ${
            errors.contact_num ? "border-[1px] border-red-400" : ""
          }`}
          placeholder="Phone number"
          {...register("contact_num", { required: true })}
        />
        <Input
          type="number"
          className={`py-[2px] focus:ring-0 ${
            errors.total_person ? "border-[1px] border-red-400" : ""
          }`}
          placeholder="Total person"
          {...register("total_person", { required: true })}
        />
        <select
          name=""
          id=""
          className="w-full pl-4 pr-3 py-[2px] bg-opacity-50 rounded-lg"
          {...register("table_number", { required: true })}
        >
          {tables
            .filter((table) => !table?.isOccupied)
            .map((table) => {
              return (
                <option key={table?._id} value={table?._id}>
                  {table?.tableName}
                </option>
              );
            })}
        </select>
        {errors.table_number && (
          <p className="text-red-500 font-xs font-semibold">
            Table number is required
          </p>
        )}
        <div className="flex items-center gap-2">
          <motion.button
            className="bg-amber-sea text-white px-6 py-2 rounded-md text-xs font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <div className="animate-spin">
                <Loader size={16} />
              </div>
            ) : (
              "Add"
            )}
          </motion.button>
          <motion.button
            className="bg-green-600 text-white px-6 py-2 rounded-md text-xs font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCustomerAddModel(false)}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default AddNewCustomer;
