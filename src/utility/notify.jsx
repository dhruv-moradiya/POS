import { toast } from "react-hot-toast";

function notify(type, message) {
  if (type === "success") {
    toast.success(message, {
      duration: 4000,
      position: "top-left",
    });
  } else if (type === "error") {
    toast.error(message, {
      duration: 4000,
      position: "top-left",
    });
  }
}

function notifyPromise(promise) {
  toast.promise(
    promise,
    {
      loading: "Loading...",
      success: "Operation successful!",
      error: (err) => `Something went wrong: ${err.message || err}`,
    },
    {
      position: "top-left",
      style: {
        minWidth: "250px",
        padding: "16px",
        borderRadius: "8px",
      },
      success: {
        style: {
          background: "#4caf50",
          color: "#fff",
        },
      },
      error: {
        style: {
          background: "#f44336",
          color: "#fff",
        },
      },
      loading: {
        style: {
          background: "#2196f3",
          color: "#fff",
        },
      },
    }
  );
}

export { notify, notifyPromise };
