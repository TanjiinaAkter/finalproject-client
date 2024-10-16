import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
const FoodCard = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // update info ta pabo refetch diye
  const [, refetch] = useCart();
  const { image, price, recipe, name, _id } = item;
  //console.log(item);
  const location = useLocation();
  const navigate = useNavigate();
  //console.log(location)
  const handleAddToCart = (item) => {
    console.log(item);
    // user nitesi karon kon user add to cart koreche seta pete hole email lagbe user er
    if (user && user.email) {
      // create post
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      // axiosasecure hocche axios er ekta hook , amra ekhane eita use kortesi karon amader user konta ta pete jwt token er kaje axios lagbe, ar amra baseUrl ta ekhane axiossecure theke nilam add to cart korar jonno
      axiosSecure.post("/carts", cartItem).then((res) => {
        //console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} id added to the cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card m-4 md:m-0 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute bg-slate-900 right-0 mr-4 px-4 text-white mt-4">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          {/* // full item pathai dilam parameter e */}
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
