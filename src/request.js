import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URI}`,
});

export const request = async function (requestConfig, options) {
  const defaultOnSuccess = function (response) {
    const { data } = response;

    return data;
  };

  const defaultOnError = function (error) {
    return Promise.reject(error.response);
  };

  return API(requestConfig)
    .then(options?.onSuccess ? options.onSuccess : defaultOnSuccess)
    .catch(options?.onError ? options.onError : defaultOnError);
};

export default request;