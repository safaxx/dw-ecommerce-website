import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProducts from "./components/Admin/AdminProducts";
import SubmitProductForm from "./components/Admin/SubmitProductForm";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminOrderDetails from "./components/Admin/AdminOrderDetails";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminReviews from "./components/Admin/AdminReviews";

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
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {!isAdminRoute && <Header />}
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

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<SubmitProductForm />} />
          <Route path="products/:id/edit" element={<SubmitProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
