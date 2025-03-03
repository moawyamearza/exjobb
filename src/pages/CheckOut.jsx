import React from "react";
import { useFeatureFlagVariantKey } from "posthog-js/react";
import OneStepCheckout from "../components/OneStepCheckout";
import MultiStepCheckout from "../components/MultiStepCheckout";
import "../styles/_home.scss";

const Checkout = () => {
  const variant = useFeatureFlagVariantKey("checkout-flow-test") || "control";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
  
      
      {/* Rendera rätt checkout-process baserat på PostHog-varianten */}
      {variant === "control" ? <MultiStepCheckout /> : <OneStepCheckout />}
    </div>
  );
};

export default Checkout;
