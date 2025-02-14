import React from "react";
import { useFeatureFlagVariantKey } from "posthog-js/react";
import OneStepCheckout from "../components/OneStepCheckout";
import MultiStepCheckout from "../components/MultiStepCheckout";
import "../styles/_home.scss";

const Checkout = () => {
  const variant = useFeatureFlagVariantKey("checkout-process-test") || "A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      
      {/* Rendera rätt checkout-process baserat på PostHog-varianten */}
      {variant === "B" ? <MultiStepCheckout /> : <OneStepCheckout />}
    </div>
  );
};

export default Checkout;
