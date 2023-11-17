import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../utils/makeRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const request = async () => {
      try {
        await makeRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    request();
  }, []);

  return (
    <div
      style={{
        flex: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "green",
      }}
    >
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
