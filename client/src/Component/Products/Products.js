import React, { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../ProductContext";
import { useAuth } from "../../AuthContext";
import "./products.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const { products, setProducts } = useContext(ProductsContext);

  const [quantities, setQuantities] = useState([]);
  const [remainingQuantities, setRemainingQuantities] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/product/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setQuantities(Array(data.length).fill(0));
        setRemainingQuantities(data.map((product) => product.quantity));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    const newRemainingQuantities = [...remainingQuantities];
    if (newRemainingQuantities[index] > 0) {
      newQuantities[index]++;
      newRemainingQuantities[index]--;
    }
    setQuantities(newQuantities);
    setRemainingQuantities(newRemainingQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    const newRemainingQuantities = [...remainingQuantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
      newRemainingQuantities[index]++;
    }
    setQuantities(newQuantities);
    setRemainingQuantities(newRemainingQuantities);
  };

  // const handleAddToCart = () => {
  //   products.forEach((product, index) => {
  //     if (quantities[index] > 0) {
  //       addToCart(product, quantities[index]);
  //       toast.success(`${product.name} added to cart!`);
  //     }
  //   });
  //   setQuantities(Array(products.length).fill(0)); // Reset quantities after adding to cart
  // };

  const incrementedProducts = products.filter(
    (_, index) => quantities[index] > 0
  );

  return (
    <div className="products-container">
      <div className="products-grid">
        {products.map((product, index) => (
          <div
            className={`product-card ${
              remainingQuantities[index] === 0 ? "out-of-stock" : ""
            }`}
            key={product.id}
          >
            <div className="card mb-4">
              {product.image && (
                <div className="image-container">
                  <img
                    src={`http://localhost:9000${product.image}`}
                    alt={product.name}
                    className={`card-img-top ${
                      remainingQuantities[index] === 0 ? "out-of-stock" : ""
                    }`}
                  />
                  {remainingQuantities[index] === 0 && (
                    <div className="out-of-stock-overlay">Out of Stock</div>
                  )}
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">
                  {remainingQuantities[index] > 0
                    ? `Remaining Quantity: ${remainingQuantities[index]}`
                    : "Out of Stock"}
                </p>
                <p className="card-text">Quantity: {quantities[index]}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDecrement(index)}
                    disabled={quantities[index] === 0}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleIncrement(index)}
                    disabled={remainingQuantities[index] === 0}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-sidebar">
        <h4>Cart</h4>
        {incrementedProducts.length > 0 ? (
          incrementedProducts.map((product, index) => (
            <div key={product.id} className="cart-item">
              <span>{product.name}</span>
              <span>Quantity: {quantities[products.indexOf(product)]}</span>
            </div>
          ))
        ) : (
          <p>No items added</p>
        )}
        <button className="btn btn-secondary mt-3">
          <FaShoppingCart /> Add All to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
