import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  // specific user er items gulo pabo cart er
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  // total price ber korlam payment er jonno
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  console.log(totalPrice);
  useEffect(() => {
    // amra obj hisebe send kortesi 'itemstotalprice' er nam price diye karon server e price diyechilam
    if (totalPrice > 0) {
      // create post ditesi jeno ekta secret key pai res e kore ..ei key chara payment korte parbona
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          console.log("secret key clientSecret", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  //console.log(cart)
  // errors usestate amder nijer kora eita diye amra error show koracchi
  const [error, setError] = useState("");
  const stripe = useStripe();
  //pass the payment information collected by the Payment Element to the Stripe API,
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // elements mane card er info na thakle return kore dibe..ar stripe hocche amder application k connect korlam PK diye stripe er api er sathe seta na thakle...
    if (!stripe || !elements) {
      return;
    }
    //cardElement k card er moddhe rakhlam
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    // card diye amra payment system ready kortesi jodi error thake then seta niche dekhacchi
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      // payment method er type hishebe pathacchi cart ar man hishebe cart pathacchi
      type: "card",
      card,
    });

    if (error) {
      console.log("payment-error", error);
      setError(error.message);
    } else {
      console.log("payment-method", paymentMethod);
      setError("");
    }

    // CONFIRM PAYMENT
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", error);
    } else {
      console.log("payment-intent", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }

    // NOW SAVE PAYMENT IN THE DATABASE
    const payment = {
      email: user.email,
      transactionId: paymentIntent.id,
      price: totalPrice,
      date: new Date(),
      // user er cart items thake cart collection e
      cartIds: cart.map((item) => item._id),
      manuItemIds: cart.map((item) => item.menuId),
      status: "pending",
    };

    const res = await axiosSecure.post("/payments", payment);
    console.log("payment saved", res.data);
    refetch();
    if (res.data?.paymentResult?.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "thank you for the payment",
        showConfirmButton: false,
        timer: 1500,
      });
      // ei items gulo ei user er paymentahaistory te dekhabo...sathe deleteresult mane jei  id er item add korsi seta user er cart theke delete kore dibo
      navigate("/dashboard/paymentHistory");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* card er info jmn visa number verification code, Zip code/postal code mane elakar dakghor egula thakbe cardElement e */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",

              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm text-white px-8 bg-[#7bc18a] my-4"
        type="submit"
        disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {<p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600 my-4">transaction id :{transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
