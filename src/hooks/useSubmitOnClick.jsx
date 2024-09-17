import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("token"));

/**
 * A hook that provides a function to post data to a given endpoint.
 *
 * The function returns an object with the following properties:
 *
 * - `response`: The response from the server, or null if there is an error.
 * - `error`: The error message from the server, or null if there is no error.
 * - `loading`: A boolean indicating whether the request is in progress.
 * - `postData`: The function to call to post the data.
 *
 * The `postData` function takes the following arguments:
 *
 * - `endpoint`: The endpoint to post the data to.
 * - `data`: The data to post.
 * - `type`: The type of request to make (default: "post").
 */

function useSubmitOnClick() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (endpoint, data, type = "post") => {
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
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, postData };
}

export default useSubmitOnClick;
