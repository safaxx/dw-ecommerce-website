import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Metadata from "./components/layout/Metadata";
import ProductsPage from "./components/Product/ProductsPage";
import LoginAndRegister from "./components/User/LoginAndRegister";
import ResetPassword from "./components/User/ResetPassword";
import { loadUser } from "../app/actions/UserActions";
import Profile from "./components/User/Profile";
import AccountLayout from "./components/User/AccountLayout";
import OrdersList from "./components/Order/OrdersList";
import OrderDetails from "./components/Order/OrderDetails";
import Wishlist from "./components/Order/WishList";

function Page({ title, description }) {
  return (
    <main className="page-content">
      <Metadata title={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/about"
          element={
            <Page
              title="About"
              description="We curate useful products with a sharp eye for quality."
            />
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/contact"
          element={
            <Page
              title="Let us help."
              description="Reach out with questions about products or orders."
            />
          }
        />
        <Route path="/login" element={<LoginAndRegister />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* User Account Routes  */}
        <Route path="/my-account" element={<AccountLayout />}>
          <Route index element={<Profile />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
