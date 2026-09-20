const ConfirmOrder = ({ shippingInfo, cartItems, itemsPrice, taxPrice, totalPrice, shippingPrice, onBack, onContinue }) => (
  <section className="checkout-confirmation">
    <div className="checkout-confirmation-block">
      <h2>Shipping Details</h2>
      <p>{shippingInfo.address}</p>
      <p>
        {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.pincode}
      </p>
      <p>{shippingInfo.country}</p>
      <p>{shippingInfo.phoneNumber}</p>
    </div>

    <div className="checkout-confirmation-block">
      <h2>Order Items</h2>
      <ul className="checkout-items">
        {cartItems.map((item) => (
          <li key={`${item.product}-${item.size}`}>
            <span>
              {item.name} x {item.quantity}
              {item.size ? ` (${item.size})` : ""}
            </span>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <div className="checkout-summary">
        <p>
          <span>Subtotal</span>
          <strong>${itemsPrice.toFixed(2)}</strong>
        </p>
        <p>
          <span>Tax</span>
          <strong>${taxPrice.toFixed(2)}</strong>
        </p>
        <p>
          <span>Shipping</span>
          <strong>${shippingPrice.toFixed(2)}</strong>
        </p>
        <p className="checkout-total">
          <span>Total</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </p>
      </div>
    </div>

    <div className="checkout-actions">
      <button type="button" className="checkout-secondary-button" onClick={onBack}>
        Back
      </button>
      <button type="button" className="checkout-primary-button" onClick={onContinue}>
        Continue to Payment
      </button>
    </div>
  </section>
);

export default ConfirmOrder;
