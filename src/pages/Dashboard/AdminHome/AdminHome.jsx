import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],

    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      //console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl text-red-500 mb-16">
        <span className="mr-3 text-black"> Hi welcome back</span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      {/* STATISTICS DETAILS */}
      <div className="flex flex-wrap justify-center items-center gap-5">
        <div className="stats shadow flex items-center  bg-gradient-to-r from-[#BB34F5] to-[#e67dc057]">
          <div>
            <FaDollarSign className="text-5xl text-white "></FaDollarSign>
          </div>
          <div className="stat text-white place-items-center">
            <div className="stat-title text-white ">Revenue</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc text-white ">
              From January 1st to February 1st
            </div>
          </div>
        </div>

        <div className="stats shadow flex items-center  bg-gradient-to-r from-[#BB34F5] to-[#e67dc057]">
          <div>
            <FaDollarSign className="text-5xl text-white "></FaDollarSign>
          </div>
          <div className="stat text-white place-items-center">
            <div className="stat-title text-white ">Menu</div>
            <div className="stat-value">${stats.menuItems}</div>
            <div className="stat-desc text-white ">
              From January 1st to February 1st
            </div>
          </div>
        </div>

        <div className="stats shadow flex items-center  bg-gradient-to-r from-[#BB34F5] to-[#e67dc057]">
          <div>
            <FaDollarSign className="text-5xl text-white "></FaDollarSign>
          </div>
          <div className="stat text-white place-items-center">
            <div className="stat-title text-white ">Orders</div>
            <div className="stat-value">${stats.orders}</div>
            <div className="stat-desc text-white ">
              From January 1st to February 1st
            </div>
          </div>
        </div>
        <div className="stats shadow flex items-center  bg-gradient-to-r from-[#BB34F5] to-[#e67dc057]">
          <div>
            <FaDollarSign className="text-5xl text-white "></FaDollarSign>
          </div>
          <div className="stat text-white place-items-center">
            <div className="stat-title text-white ">Users</div>
            <div className="stat-value">${stats.users}</div>
            <div className="stat-desc text-white ">
              From January 1st to February 1st
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
