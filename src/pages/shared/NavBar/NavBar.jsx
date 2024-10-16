import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  // tansttack query diye kora cart data nilam
  const [cart] = useCart();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        //console.log(error);
      });
  };
  const navOptions = (
    <>
      <li>
        <NavLink activeClassName="active" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/menu">Our menu</NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/order/salad">Order food</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/secret">Secret page</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
      {user ? (
        <>
          <span className="mt-2">{user.displayName}</span>
          <button onClick={handleLogOut} className="btn btn-ghost">
            Log out
          </button>
        </>
      ) : (
        <>
          <li>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar bg-black max-w-screen-xl fixed z-10 opacity-55 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">{/* <a className="btn">Login</a> */}</div>
      </div>
    </>
  );
};

export default NavBar;
