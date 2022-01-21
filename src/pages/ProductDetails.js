import React, { Component } from 'react';
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
    return <p data-testid="product-detail-name">{product.title}</p>;
  }
}

ProductDetails.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetails;
