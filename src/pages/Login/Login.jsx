import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
// 1.captcha code import korlam
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //console.log(location);
  //========== console.log(location.state); er console e ashe from{{pathname: '/secret', search: '', hash: '', state: null, key: 'gbis66dh'}}........ so location.state?.from.pathname  eita pacchi only jokhn private route e hit kortesi

  // ekhane amra location er state e kore from ta pacchi karon amra private route e hit kortesilam tai...noyto home ba normal route theke login e hit korle null petam

  //same code if else use kore korte pari optional chaining na diyeo #const location = useLocation(); // React Router's useLocation hook

  // ====================================== let from = location;  // Initially assigning location to from

  // // Check if location.state and location.state.from.pathname exist
  // if (location.state && location.state.from && location.state.from.pathname) {
  //   from = location.state.from.pathname;  // Assign the pathname if it exists
  // } else {
  //   from = "/";  // Default to "/" if pathname doesn't exist
  // ======================================}

  const from = location.state?.from.pathname || "/";
  const { signIn } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(true);
  // 2.captcha code koy word er chai seta set korlam
  useEffect(() => {
    loadCaptchaEnginge(9);
  }, []);
  //input e onblur diye validation er kaj korlam ... jodi valid hoy tahole amra login er btn disable off kore dibo otherwise disable e thakbe login korte parbe na
  const handleValidateCaptcha = (e) => {
    console.log(e.target.value);

    const user_captcha_value = e.target.value;
    // console.log(user_captcha_value);
    /* // 8. validate captcha code */
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  /// =============== login authentication ================///
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //console.log(email, password);

    signIn(email, password).then((result) => {
      console.log(result.user);
      Swal.fire({
        title: "Logged in successfull !!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });

      navigate(from, { replace: true });
    });
  };
  // const handleGoogleLogIn = () => {};
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Log In </title>
      </Helmet>
      <div className="bg-base-200 min-h-screen">
        <div className="mx-16 pt-12">
          <Link to="/">
            <button className="btn btn-outline btn-secondary">
              Back to home
            </button>
          </Link>
        </div>
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="md:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm md:w-1/2 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {/*=============== CAPTCHA CODE STARTS ===============*/}
              <div className="form-control">
                {/* // 2. captcha code */}
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  placeholder="type the captcha text"
                  name="captcha"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="p-4">
              <small className="text-red-600">
                New here? <Link to="/signup">Create an account</Link>{" "}
              </small>
            </p>
            <div className="divider px-4"></div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
