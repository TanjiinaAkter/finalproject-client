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
  // interceptor kokhn dicchi..jokhn allusers k dekhar jonno get request dicchi tokhn axiosSecure er karone ei hook e ashbe then incerceptor er vitorer kaj ta korbe..........interceptor  use kore request kortesi karon headers ta ekhane dibo bar bar /users er get,patch,delete e na diye ...so token ta header e attach kore ditesi , ekhn server e jete get  /users e jokhn jabo tokhn amra ekhane verifyToken middleware set kore diyechi jate client er token ta server er token er sathe verify kora jay , then verify hole ... jehetu all users ta admin only dekhte ar modify korte parbe tai amader abar condition dite hobe user ta admin kina...
  // verify hole amder hoyto response dibo thik thakle...noyto response e error pele logout kore login page e redirect kore dibo
  axiosSecure.interceptors.request.use(
    function (config) {
      //gese kina verifytoken middle ware e check korte server e jeye dekhbo asche kina
      const token = localStorage.getItem("access-token");
      //console.log(token);
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
        // ekhane token invalid holei logout kore dicchi...
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
