import React from "react";
import useFetch from "./custom-hook/useFetch";

const Home = () => {
  let { products } = useFetch("https://fakestoreapi.com/products");

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Our Store</h1>
        <p className="hero-subtitle">
          Discover amazing products at unbeatable prices
        </p>
      </header>

      <section className="category-overview">
        <h2 className="category-title">Product Categories</h2>

        <ul className="category-list">
          {uniqueCategories.map((category, index) => (
            <li key={index} className="category-item">
              {category}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
