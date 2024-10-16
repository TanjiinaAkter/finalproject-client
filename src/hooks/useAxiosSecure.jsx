import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  //   // ekhane amra users dekhte chaitesi jeta only admin parbe tai token diye ditesi token header theke check kor server acceess dibe
  // interceptor use kore request kortesi karon headers ta ekhane dibo bar bar /users er get,patch,delete e na diye ...so token header e send kore ditesi verify korar jonno... verify token middleware e
  // verify hole amder hoyto response dibo thik thakle...noyto response e error pele logout kore login page e redirect kore dibo
  axiosSecure.interceptors.request.use(
    function (config) {
      //gese kina verifytoken middle ware e check korte server e jeye dekhbo asche kina
      const token = localStorage.getItem("access-token");
      console.log(token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in the inteerceptor", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
