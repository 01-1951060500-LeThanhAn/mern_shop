import stripePackage from "stripe";
const stripe = new stripePackage(
  "sk_test_51JsT6lDhEfGrbNnM2H7bWwBqLm3ZsoMD3AOr5iLLrl6bXb0BOmmEZGOq2hTPF6ZtZIm7jzvl5KisMm5bJCVEryxu008PnLP1EY"
);
const checkout = async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

export { checkout };
