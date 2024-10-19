import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  // data load hocche kina seta check korete use hoy...isAdminLoading er value jodi true hoy tar mane fetch kore akhono sesh hoy nai tokhn sob data jeno aste pare tai amra loading diye dicchi... then data peye gele porer dhape jabe mane isadmin check kore children routes e access dibe
  if (loading || isAdminLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export default AdminRoute;
