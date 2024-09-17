import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import axios from "axios";
import { notify } from "../../utility/notify";
import { LoaderIcon } from "lucide-react";

function SignIn() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});

  const onSubmit = async (data) => {
    setIsFormSubmitted(true);

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_SERVER_URL}/admin/login-admin`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            notify("success", response.data.message);
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.accessToken)
            );
          } else {
            notify("error", response.message);
          }
        })
        .catch((error) => {
          console.error("🚀 ~ onSubmit ~ error:", error);
          notify("error", error?.response?.data?.message);
        })
        .finally(() => {
          setIsFormSubmitted(false);
        });
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
      notify("error", error.message);
    }

    // reset();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold my-3">Sign In</h2>
      <motion.form
        className="w-1/3 flex flex-col gap-4 p-6 bg-white rounded-lg shadow  text-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <Input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 font-semibold text-xs">
              {errors.email.message}
            </p>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 font-semibold text-xs">
              {errors.password.message}
            </p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="p-2 px-4 w-fit bg-amber-sea text-white rounded-lg shadow-lg hover:bg-amber-sea-dark transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          animate={{ opacity: 1 }}
        >
          {isFormSubmitted ? (
            <div className="animate-spin">
              <LoaderIcon size={16} />
            </div>
          ) : (
            "Sing Ip"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default SignIn;
