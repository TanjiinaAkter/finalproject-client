import { useQuery } from "@tanstack/react-query";

// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  // ============== baseUrl anlam axiosSecure hook theke ,kheal rakhte hobe jeno secure baseurl ani, not public baseurl =============//
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(users);
      return res.data;
    },
  });
  //============== MAKING AN USER  AS A ADMIN======//
  const handleMakeAdmin = (user) => {
    // user k admin e update korte update korar jonno filed pathacchi server e... then condtion diye ditesi  update korte.. role btn e click krle admin hobe mane oi id ta admin
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      // id pathaitesi jeta seerver e giye new field add korbe role=admin , pore response e update hoye ashbe then amra btn e click korle condotion dibo rol=admin thakle seta admin hoye modify hobe ..click na korle ja ache tai
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  //============== DELETE AN USER =================//
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`);

        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      }
      refetch();
    });
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl ">All Users : nothing written</h2>
        <h2 className="text-3xl ">Total Users :{users.length}</h2>
      </div>
      {/* table */}
      <div className="overflow-x-auto bg-white shadow-lg m-8 rounded-md">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="">
            <tr className="bg-[#81C79B] text-white text-base">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn  bg-orange-400 ">
                      <FaUsers className="text-white text-2xl"></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg">
                    <FaTrash className="text-red-600"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
