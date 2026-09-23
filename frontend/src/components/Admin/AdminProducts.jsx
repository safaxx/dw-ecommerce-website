import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AllProducts } from "../Product/ProductsPage";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    try {
      await axios.delete(`/api/v1/products/${id}`);
      setRefreshKey((key) => key + 1);
    } catch (requestError) {
      alert(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <h2>Products</h2>
        <Link to="/admin/products/new" className="checkout-primary-button">
          Add Product
        </Link>
      </div>
      <AllProducts
        key={refreshKey}
        isAdmin
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
export default AdminProducts;
