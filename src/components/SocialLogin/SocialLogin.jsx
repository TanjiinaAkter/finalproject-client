import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  // hook theke data ante kono {} er moddhe destructure kora lagbe na
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogIn = () => {
    googleSignIn().then((result) => {
      //console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        //console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="my-6 flex justify-center items-center mx-8">
      <button
        onClick={handleGoogleLogIn}
        className="btn w-full text-blue-600 font-semibold text-lg">
        <FcGoogle className="pr-4 text-5xl " />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
