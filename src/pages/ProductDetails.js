import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      allProducts: [],
    };
    this.callApi = this.callApi.bind(this);
    this.addCart = this.addCart.bind(this);
    this.GetOnMount = this.GetOnMount.bind(this);
  }

  componentDidMount() {
    this.callApi();
  }

  componentDidUpdate(_, prevState) {
    const { allProducts } = this.state;
    if (prevState.allProducts !== allProducts) {
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
  }

  addCart(product) {
    const { allProducts } = this.state;
    this.setState({ allProducts: [...allProducts, product] });
  }

  GetOnMount() {
    const GET_ITEMS = JSON.parse(localStorage.getItem('products'));
    this.setState({ allProducts: GET_ITEMS || [] });
  }

  async callApi() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductFromId(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <header>
          <nav>
            <Link data-testid="shopping-cart-button" to="/cart">
              <i className="fas fa-shopping-cart" />
            </Link>
          </nav>
        </header>
        <p>{product.price}</p>
        <p data-testid="product-detail-name">{ product.title }</p>
        <img src={ product.thumbnail } alt={ product.title } />
        <button
          onClick={ () => this.addCart(product) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
