import React, { useEffect, useState } from "react";
import posthog from "posthog-js";

const Checkout = () => {
  const [variant, setVariant] = useState("A");

  useEffect(() => {
    // Hämta variant från PostHog
    const expVariant = posthog.getFeatureFlag("checkout-button-test") || "A";
    setVariant(expVariant);

    // Spåra vilken variant som visas
    posthog.capture("checkout_variant_seen", { variant: expVariant });
  }, []);

  const handleCheckout = () => {
    posthog.capture("checkout_button_clicked", { variant });
    alert(`You selected Variant ${variant}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-lg mb-6">Complete your purchase below.</p>

      {variant === "A" ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
          onClick={handleCheckout}
        >
          Complete Purchase
        </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
          onClick={handleCheckout}
        >
          Complete Purchase (10% Off)
        </button>
      )}
    </div>
  );
};

export default Checkout;
