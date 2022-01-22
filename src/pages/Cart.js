import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const getAll = JSON.parse(localStorage.getItem('products'));
    this.setState({ allProducts: getAll || [] });
  }

  render() {
    const { allProducts } = this.state;
    return (
      <div>
        {allProducts.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <ul>
            {allProducts.map((product) => (
              <li className="card" key={ product.id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/details/${product.id}` }
                >
                  <p
                    className="card-title"
                    data-testid="shopping-cart-product-name"
                  >
                    {product.title}
                  </p>
                  <img
                    className="image-card"
                    src={ product.thumbnail }
                    alt={ product.title }
                  />
                  <p className="card-price">{`Valor: R$${product.price}`}</p>
                  <p data-testid="shopping-cart-product-quantity">1</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Cart;
