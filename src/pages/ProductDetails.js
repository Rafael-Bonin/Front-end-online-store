import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
    this.callApi = this.callApi.bind(this);
  }

  componentDidMount() {
    this.callApi();
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
        <p>{product.price}</p>
        <p data-testid="product-detail-name">{product.title}</p>
        <img src={ product.thumbnail } alt={ product.title } />
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
