import React, { useEffect, useState } from "react";
import posthog from "posthog-js";
import OneStepCheckout from "../components/OneStepCheckout";
import MultiStepCheckout from "../components/MultiStepCheckout";
import "../styles/_home.scss";

const Checkout = () => {
  const [variant, setVariant] = useState("A");
  useEffect(() => {
    const expVariant = posthog.useFeatureFlagVariantKey("checkout-process-test") || "A";
    setVariant(expVariant);

    posthog.capture("checkout_variant_seen", { variant: expVariant });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {variant === "A" ? <OneStepCheckout /> : <MultiStepCheckout />}
    </div>
  );
};

export default Checkout;
