/* eslint-disable no-undef */
import React from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NejxAEBIU3eKp2JOeInWCMgFmQlGHzsZetIErZNO4cYOGy9Q8k5CtTzNTFg8PjVPwDrMCnTpPm22e9smZEU9AwJ00GNNEM2Gx"
);
const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const request = async () => {
      try {
        const res = await makeRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
