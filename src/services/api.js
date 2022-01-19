export const getCategories = () => fetch('https://api.mercadolibre.com/sites/MLB/categories')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);

export const getProductsFromCategoryAndQuery = (categoryId, query) => fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
