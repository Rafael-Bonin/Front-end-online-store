import React from 'react';
import query from '../__mocks__/query';


export const getCategories = () => 
  fetch('https://api.mercadolibre.com/sites/MLB/categories')
  .then((response) => response.json())
  .then((data) => data)
  .catch(error => error);

const categories =  getCategories();

export  const getProductsFromCategoryAndQuery = (categoryId, query) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch(error => error);
  


