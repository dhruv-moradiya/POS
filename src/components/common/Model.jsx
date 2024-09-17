import { motion } from "framer-motion";
import { ChevronRight, Loader, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

const Model = ({ closeModel, isLoading, onSubmit, quantity, discount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: quantity ? quantity : "1",
      discount: discount ? discount : "0",
    },
  });

  console.log("Error in model form :>> ", errors);

  return (
    <motion.form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="w-full flex flex-col items-center gap-2 px-8 overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full flex items-center gap-6 px-8">
        <div className="flex-1 flex flex-col items-start gap-1">
          <p className="font-semibold text-xs">Quantity</p>
          <input
            type="number"
            className="w-full pl-3 rounded-md border-[1px] border-raisin-black border-opacity-80 focus:outline-none"
            {...register("quantity", { required: true })}
          />
        </div>
        <div className="flex-1 flex flex-col items-start gap-1">
          <p className="font-semibold text-xs">Discount (%)</p>
          <input
            type="number"
            className="w-full pl-3 rounded-md border-[1px] border-raisin-black border-opacity-80 focus:outline-none"
            {...register("discount", { required: false })}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-amber-sea text-white text-xs font-semibold px-4 py-1 rounded-md"
          type="submit"
        >
          {isLoading ? (
            <div className="animate-spin">
              <Loader size={16} />
            </div>
          ) : (
            "APPLY"
          )}
        </button>
        <button
          className="bg-amber-sea text-white text-xs font-semibold px-4 py-1 rounded-md"
          onClick={closeModel}
          type="button"
        >
          CANCEL
        </button>
      </div>
    </motion.form>
  );
};

export default Model;
