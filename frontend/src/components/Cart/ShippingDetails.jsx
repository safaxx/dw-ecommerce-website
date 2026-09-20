const ShippingDetails = ({ shippingInfo, onChange, onSubmit }) => {
  const fields = [
    ["address", "Address", "text"],
    ["city", "City", "text"],
    ["state", "State", "text"],
    ["country", "Country", "text"],
    ["pincode", "Pincode", "text"],
    ["phoneNumber", "Phone number", "tel"],
  ];

  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h2>Shipping Details</h2>
      <div className="checkout-form-grid">
        {fields.map(([name, label, type]) => (
          <label key={name}>
            <span>{label}</span>
            <input
              type={type}
              name={name}
              value={shippingInfo[name]}
              onChange={onChange}
              required
            />
          </label>
        ))}
      </div>
      <button type="submit" className="checkout-primary-button">
        Continue to Confirmation
      </button>
    </form>
  );
};

export default ShippingDetails;
