import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div data-testid="product" className="card-container">
        <Link
          data-testid="product-detail-link"
          to={ `/details/${product.id}` }
          className="card"
        >
          <p className="card-title">{product.title}</p>
          <img
            className="image-card"
            src={product.thumbnail}
            alt={product.title}
          />
          <p className="card-price">{`Valor: R$${product.price}`}</p>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
