import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("user_info"))?.accessToken || "";

function useSubmitOnClick() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (endpoint, data = {}, type = "post") => {
    console.log(
      "Posting data to:",
      `${BASE_URL}/${endpoint}`,
      "with data:",
      data
    );

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const { data: responseData } = await axios({
        method: type,
        url: `${BASE_URL}/${endpoint}`,
        data,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setResponse(responseData);
      return responseData;
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : error.message;
      setError(errorMsg);

      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, postData };
}

export default useSubmitOnClick;
