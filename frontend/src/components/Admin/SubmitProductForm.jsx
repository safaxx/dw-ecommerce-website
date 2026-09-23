import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PRODUCT_SIZES } from "../../constants/sizes";
import Loader from "../layout/Loader";

const readAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const SubmitProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [sizes, setSizes] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/products/categories")
      .then(({ data }) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    axios
      .get(`/api/v1/products/${id}`)
      .then(({ data }) => {
        const product = data.product;
        setProductInfo({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        });
        setSizes(product.sizes || []);
        setExistingImages(product.images || []);
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message || requestError.message,
        );
      })
      .finally(() => setLoadingProduct(false));
  }, [id, isEditMode]);

  useEffect(() => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [imageFiles]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductInfo((current) => ({ ...current, [name]: value }));
  };

  const toggleSize = (size) => {
    setSizes((current) =>
      current.includes(size)
        ? current.filter((s) => s !== size)
        : [...current, size],
    );
  };

  const handleFileChange = (event) => {
    setImageFiles(Array.from(event.target.files));
  };

  const removeExistingImage = (publicId) => {
    setExistingImages((current) =>
      current.filter((image) => image.public_id !== publicId),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const uploadedImages = [];
      for (const file of imageFiles) {
        const base64 = await readAsBase64(file);
        const { data } = await axios.post("/api/v1/products/upload-image", {
          image: base64,
        });
        uploadedImages.push({ public_id: data.public_id, url: data.url });
      }

      const payload = {
        ...productInfo,
        price: Number(productInfo.price),
        stock: Number(productInfo.stock),
        sizes,
        images: [...existingImages, ...uploadedImages],
      };

      if (isEditMode) {
        await axios.put(`/api/v1/products/${id}`, payload);
      } else {
        await axios.post("/api/v1/products/create", payload);
      }

      navigate("/admin/products");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
      setSubmitting(false);
    }
  };

  if (loadingProduct) return <Loader />;

  return (
    <section className="admin-page">
      <p className="admin-eyebrow">Catalog</p>
      <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={productInfo.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Category</span>
            <input
              type="text"
              name="category"
              value={productInfo.category}
              onChange={handleChange}
              list="admin-category-options"
              required
            />
            <datalist id="admin-category-options">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>

          <label>
            <span>Price</span>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={productInfo.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Stock</span>
            <input
              type="number"
              name="stock"
              min="0"
              value={productInfo.stock}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="admin-form-full">
          <span>Description</span>
          <textarea
            name="description"
            rows="5"
            value={productInfo.description}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset className="admin-checkbox-group">
          <legend>Sizes</legend>
          {PRODUCT_SIZES.map((size) => (
            <label key={size} className="admin-checkbox">
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              <span>{size}</span>
            </label>
          ))}
        </fieldset>

        <label className="admin-form-full">
          <span>Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required={!isEditMode && existingImages.length === 0}
          />
        </label>

        {existingImages.length > 0 && (
          <div className="admin-image-previews">
            {existingImages.map((image) => (
              <div key={image.public_id} className="admin-image-preview">
                <img src={image.url} alt="Existing product" />
                <button
                  type="button"
                  className="admin-image-remove"
                  onClick={() => removeExistingImage(image.public_id)}
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length > 0 && (
          <div className="admin-image-previews">
            {previews.map((src) => (
              <img key={src} src={src} alt="Selected product" />
            ))}
          </div>
        )}

        {error && (
          <p className="admin-form-error" role="alert">
            {error}
          </p>
        )}

        <div className="admin-form-actions">
          <button
            type="button"
            className="checkout-secondary-button"
            onClick={() => navigate("/admin/products")}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="checkout-primary-button"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Create Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SubmitProductForm;
