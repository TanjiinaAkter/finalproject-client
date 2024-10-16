import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // authentication
  const { createuser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  //console.log(data) te amra registered function er field value pabo
  const onSubmit = (data) => {
    console.log(data);
    //data er moddhe amra fields gulor value pacchi tai data.email eivabe pete hobe, eita react hook form er built in function maybe tai data dite hobe
    createuser(data.email, data.password).then((result) => {
      const loggeduser = result.user;
      //console.log(loggeduser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          //console.log("profile updated");
          //created users entry  to database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            //console.log(res.data);
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "user created and (updated also first time in registration) successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up </title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  // jei name field ta dibo oita dite hobe registered er moddhe
                  {...register("name", { required: true })}
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">
                    This name field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photo"
                  name="photo"
                  // jei name field ta dibo oita dite hobe registered er moddhe
                  {...register("photoURL", { required: true })}
                  className="input input-bordered"
                />
                {/* jodi photourl e error thake tahole p tag dekhano hobe */}
                {errors.photoURL && (
                  <span className="text-red-600">
                    photo url field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">email field is required</span>
                )}
              </div>
              {/* ======= password validation error ======= */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">password must be 6 character</p>
                )}
                {errors.password?.type === " maxLength" && (
                  <p className="text-red-600">
                    password must be less than 20 character
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    password must have 1 uppercase,1 lowercase,1 number and 1
                    special character
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="p-4">
              <Link to="/login">
                <small className="py-4 text-red-600">
                  Already registered? Go to login page
                </small>
              </Link>
            </p>{" "}
            <div className="divider px-4"></div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
