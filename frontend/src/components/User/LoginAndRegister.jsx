import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register, forgotPassword, clearErrors } from "../../../app/actions/UserActions";
import Metadata from "../layout/Metadata";
import "./LoginAndRegister.css";

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      })
    );
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(forgotEmail));
  };

  const tabTitles = { login: "Login", register: "Register", forgot: "Forgot Password" };

  return (
    <main className="page-content">
      <Metadata title={tabTitles[activeTab]} />
      <div className="login-register-box">
        {activeTab !== "forgot" && (
          <div className="login-register-toggle">
            <p
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              LOGIN
            </p>
            <p
              className={activeTab === "register" ? "active" : ""}
              onClick={() => setActiveTab("register")}
            >
              REGISTER
            </p>
          </div>
        )}

        {error && <p role="alert">{error}</p>}
        {message && activeTab === "forgot" && <p className="auth-message">{message}</p>}

        {activeTab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <p className="forgot-password-link">
              <span onClick={() => setActiveTab("forgot")}>Forgot password?</span>
            </p>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {activeTab === "register" && (
          <form className="auth-form" onSubmit={handleRegister}>
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        )}

        {activeTab === "forgot" && (
          <form className="auth-form" onSubmit={handleForgotPassword}>
            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <p className="forgot-password-link">
              <span onClick={() => setActiveTab("login")}>Back to login</span>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};

export default LoginAndRegister;
