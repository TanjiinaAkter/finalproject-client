import {
  FaAd,
  FaBook,
  FaCalendar,
  FaFileContract,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  // cart collection anlam karon carte r info theke price ar length ta lagtese
  const [cart] = useCart();
  const isAdmin = true;
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="w-64 min-h-screen bg-[#86D293] text-white">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd>
                  Add a Reveiw
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaList></FaList>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* SHARED NAVLINKS */}
          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <AiOutlineMenu></AiOutlineMenu>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaShop></FaShop>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaFileContract></FaFileContract>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* DASHBOARD CONTENT */}
      <div className="bg-[#acceaa] flex-1 p-8">
        {/* jeta dynamic vabe amra change korbo oita te outlet use korbo */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
