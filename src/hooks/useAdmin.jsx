import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // data:isAdmin mane data tar nam dilam isAdmin..isAdmin er man hocche res.data
  const { data: isAdmin ,isPending:isAdminLoading} = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data);
      // res.data hocche amra get users/admin/:email route e last e admin = admin hoshebe pathai ditesi seta res hishebe pacche, ar res.data mane pabo hocche admin = admin ,,,,ar sorsori value pawar jonno res.data?.admin dicchi mane ...admin
      return res.data?.admin;
    },
  });
  // ekhane return hobe oije uporer data ,ar datar moddhe diye dilam isAdmin er man mane admin ..eita
  return [isAdmin,isAdminLoading];
};

export default useAdmin;
