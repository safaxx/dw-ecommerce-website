import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, clearErrors } from "../../../app/actions/UserActions";
import Metadata from "../layout/Metadata";
import "./LoginAndRegister.css";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, { newPassword, confirmPassword }));
  };

  return (
    <main className="page-content">
      <Metadata title="Reset Password" />
      <div className="login-register-box">
        {error && <p role="alert">{error}</p>}
        <form className="auth-form" onSubmit={handleResetPassword}>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
