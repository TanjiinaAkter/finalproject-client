import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useCart = () => {
  // usecart e specific user er order kora items pabo
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //console.log(user);
  // data nibo..eitay amra nijer motto kore nam dite pari ar default value o dite pari
  // amra data hishbe ekta empty array dicchi jetar moddhe api theke fetch kora data set hobe.. ar key hishebe cart dicchi jeno ei fetch er kaj kothay kora hoyeche seta find out korte pare
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      //jei email diye API call pathacchi, sei email er under e je cart information thakbe, segulo ei cart state er moddhe store hoye jabe
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  //console.log(cart);
  return [cart, refetch];
};

export default useCart;
