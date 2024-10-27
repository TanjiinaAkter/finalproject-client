import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

// stripe import element and loadstripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// PUBLISHABLE KEY PROVIDED FROM STRIPE DEVELOPER
// Stripe-এর সাথে সংযোগ স্থাপন করে...,কী-এর মাধ্যমে আপনি Stripe-এর সার্ভিস ব্যবহার করতে পারবেন।
//loadStripe-->এটি আপনার অ্যাপ্লিকেশনকে Stripe-এর API-এর সাথে সংযোগ করার জন্য প্রস্তুত করে।
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div className="bg-white">
      <SectionTitle
        heading="Payment"
        subheading="Please Pay To Eat"></SectionTitle>

      {/* STRIPE PAYMENT CODE */}
      <div>
        {/* amader pk dilam stripe er moddhe jeno amder ta diye strip payment er kaj
        korte pare */}
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
