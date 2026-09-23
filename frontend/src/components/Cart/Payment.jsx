const Payment = ({
  totalPrice,
  loading,
  error,
  onBack,
  onSubmit,
  paymentMethod,
  onPaymentMethodChange,
}) => (
  <section className="checkout-payment">
    <h2>Payment</h2>
    <label className="checkout-payment-field">
      <span>Payment method</span>
      <select
        className="checkout-payment-select"
        value={paymentMethod}
        onChange={(event) => onPaymentMethodChange(event.target.value)}
        disabled={loading}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="Razorpay">Razorpay</option>
      </select>
    </label>
    <p className="checkout-payment-note">
      {paymentMethod === "Razorpay"
        ? "You'll be redirected to Razorpay to complete payment securely."
        : "Pay in cash when your order is delivered."}
    </p>
    <div className="checkout-total checkout-payment-total">
      <span>Amount due</span>
      <strong>${totalPrice.toFixed(2)}</strong>
    </div>
    {error && (
      <p className="checkout-error" role="alert">
        {error}
      </p>
    )}
    <div className="checkout-actions">
      <button
        type="button"
        className="checkout-secondary-button"
        onClick={onBack}
        disabled={loading}
      >
        Back
      </button>
      <button
        type="button"
        className="checkout-primary-button"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  </section>
);

export default Payment;
