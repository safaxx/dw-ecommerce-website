const Payment = ({ totalPrice, loading, error, onBack, onSubmit }) => (
  <section className="checkout-payment">
    <h2>Payment</h2>
    <p className="checkout-payment-note">
      Payment processing is not connected yet. Your order will be created with a pending payment status.
    </p>
    <div className="checkout-total checkout-payment-total">
      <span>Amount due</span>
      <strong>${totalPrice.toFixed(2)}</strong>
    </div>
    {error && <p className="checkout-error" role="alert">{error}</p>}
    <div className="checkout-actions">
      <button type="button" className="checkout-secondary-button" onClick={onBack} disabled={loading}>
        Back
      </button>
      <button type="button" className="checkout-primary-button" onClick={onSubmit} disabled={loading}>
        {loading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  </section>
);

export default Payment;
