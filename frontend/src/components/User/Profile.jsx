import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  updatePassword,
  clearErrors,
} from "../../../app/actions/UserActions";
import Metadata from "../layout/Metadata";
import "./LoginAndRegister.css";
import "./MyAccount.css";

const emptyAddress = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phoneNumber: "",
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "" });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(emptyAddress);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) {
    return null;
  }

  const openContactEdit = () => {
    dispatch(clearErrors());
    setContactForm({ name: user.name, email: user.email });
    setIsEditingContact(true);
  };

  const cancelContactEdit = () => setIsEditingContact(false);

  const saveContact = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({ name: contactForm.name, email: contactForm.email }),
    );
    setIsEditingContact(false);
  };

  const openAddressEdit = () => {
    dispatch(clearErrors());
    setAddressForm({ ...emptyAddress, ...user.shippingInfo });
    setIsEditingAddress(true);
  };

  const cancelAddressEdit = () => setIsEditingAddress(false);

  const saveAddress = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ shippingInfo: addressForm }));
    setIsEditingAddress(false);
  };

  const openPasswordForm = () => {
    dispatch(clearErrors());
    setIsChangingPassword(true);
  };

  const closePasswordForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    closePasswordForm();
  };

  const hasAddress = Boolean(user.shippingInfo?.address);

  return (
    <main className="my-account-page">
      <Metadata title="My Account" />
      <h1>My Account</h1>
      {error && <p role="alert">{error}</p>}

      <section className="account-section" aria-labelledby="account-contact-title">
        <div className="account-section-header">
          <h2 id="account-contact-title">Contact</h2>
          {!isEditingContact && (
            <button type="button" className="link-button" onClick={openContactEdit}>
              Edit
            </button>
          )}
        </div>

        {isEditingContact ? (
          <form className="auth-form" onSubmit={saveContact}>
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
            <div className="account-password-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" className="link-button" onClick={cancelContactEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="account-info-grid">
            <div className="account-info-row">
              <span className="account-info-label">Name</span>
              <p>{user.name}</p>
            </div>
            <div className="account-info-row">
              <span className="account-info-label">Email</span>
              <p>{user.email}</p>
            </div>
          </div>
        )}
      </section>

      <section className="account-section" aria-labelledby="account-address-title">
        <div className="account-section-header">
          <h2 id="account-address-title">Address</h2>
          {!isEditingAddress && (
            <button type="button" className="link-button" onClick={openAddressEdit}>
              Edit
            </button>
          )}
        </div>

        {isEditingAddress ? (
          <form className="auth-form" onSubmit={saveAddress}>
            <label htmlFor="address-line">Address</label>
            <input
              id="address-line"
              value={addressForm.address}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, address: e.target.value }))
              }
            />
            <label htmlFor="address-city">City</label>
            <input
              id="address-city"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, city: e.target.value }))
              }
            />
            <label htmlFor="address-state">State</label>
            <input
              id="address-state"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, state: e.target.value }))
              }
            />
            <label htmlFor="address-country">Country</label>
            <input
              id="address-country"
              value={addressForm.country}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, country: e.target.value }))
              }
            />
            <label htmlFor="address-pincode">Pincode</label>
            <input
              id="address-pincode"
              value={addressForm.pincode}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, pincode: e.target.value }))
              }
            />
            <label htmlFor="address-phone">Phone number</label>
            <input
              id="address-phone"
              value={addressForm.phoneNumber}
              onChange={(e) =>
                setAddressForm((f) => ({ ...f, phoneNumber: e.target.value }))
              }
            />
            <div className="account-password-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" className="link-button" onClick={cancelAddressEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="account-info-grid">
            <div className="account-info-row">
              <span className="account-info-label">Address</span>
              <p>
                {hasAddress
                  ? `${user.shippingInfo.address}, ${user.shippingInfo.city}, ${user.shippingInfo.state}, ${user.shippingInfo.country} ${user.shippingInfo.pincode}`
                  : "No address saved yet."}
              </p>
            </div>
            <div className="account-info-row">
              <span className="account-info-label">Phone number</span>
              <p>{user.shippingInfo?.phoneNumber || "—"}</p>
            </div>
          </div>
        )}
      </section>

      <section className="account-section" aria-labelledby="account-password-title">
        <div className="account-section-header">
          <h2 id="account-password-title">Password</h2>
          {!isChangingPassword && (
            <button type="button" className="link-button" onClick={openPasswordForm}>
              Change password
            </button>
          )}
        </div>

        {isChangingPassword && (
          <form className="auth-form" onSubmit={handleUpdatePassword}>
            <label htmlFor="old-password">Current password</label>
            <input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="confirm-password">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="account-password-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update password"}
              </button>
              <button type="button" className="link-button" onClick={closePasswordForm}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default Profile;
