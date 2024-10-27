import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        <span>HI, WELCOME</span>
        {user?.displayName ? user.displayName : "back"}
      </h2>
    </div>
  );
};

export default UserHome;
