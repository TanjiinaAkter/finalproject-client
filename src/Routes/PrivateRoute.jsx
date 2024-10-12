import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return children;
  }
  //======= jokhn private route e jete chaibo tokhn login kora na thakle amader login page e niye jabe... sathe amra state e kore amra j secret route e jete nitesilam oi pathname tao diye ditesi jeno login time  eabar ager secrete private route e navigate hote pare , arekta kotha hocche jodi normal page theke login page e jai tahole kono location ba state thakbe na null thakbe  ========//

  // state e set kore dile ei path ta onno jayga theke access korte parbo..replace true dile user ager page e jete parbe na...browser theke history chole jabe ...update hoye jabe seta ... r state={{from: location}} mane hocche amra normally location e state k null hishebe pai ...ekhane amra sei state er moddhe location ta pass korchi login page e use korar jonno

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  //eita pathacchi..... from {pathname: '/secret', search: '', hash: '', state: null, key: 'yaprhxh3'}
};

export default PrivateRoute;
