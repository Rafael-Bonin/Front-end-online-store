import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div data-testid="product" className="card-container">
        <section className="card">
          <p className="card-title">
            { product.title }
          </p>
          <img
            className="image-card"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p className="card-price">
            { `Valor: R$${product.price}` }
          </p>
        </section>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
