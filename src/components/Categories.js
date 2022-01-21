import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class Categories extends Component {
  render() {
    const { categoriesProp, isLoadingCategoryProp, renderCategory } = this.props;
    return (
      <ul>
        {isLoadingCategoryProp ? (
          <Loading />
        ) : (
          categoriesProp.map((category) => (
            <li key={ category.id } className="tira-ponto">
              <label htmlFor={ category.id } data-testid="category">
                {category.name}
                <input
                  type="radio"
                  key={ category.id }
                  name="category"
                  onChange={ renderCategory }
                  id={ category.id }
                />
              </label>
            </li>
          ))
        )}
      </ul>
    );
  }
}

Categories.propTypes = {
  categoriesProp: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoadingCategoryProp: PropTypes.bool.isRequired,
  renderCategory: PropTypes.func.isRequired,
};
