import axios from "axios";
import logger from "./logService";
//toast is a function, and functions are objects in javascript
import { toast } from "react-toastify";
//takes two function parameters for success and error handling
//dont need try catch blocks in functions that can cause unexpected errors
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.request.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.success("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
