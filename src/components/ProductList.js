import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

class ProductList extends React.Component {
  render() {
    const { products } = this.props;
    const { results } = products;
    const minLength = 0;

    return (
      <div>
        {
          results.length === minLength ? (
            <h2>Nenhum produto foi encontrado</h2>
          ) : (
            results
              .map((product) => <ProductCard key={ product.id } product={ product } />)
          )
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.shape(PropTypes.object).isRequired,
};

export default ProductList;
