import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import '../App.css';
import Categories from '../components/Categories';

class Home extends React.Component {
  constructor() {
    super();

    this.handlechangeSearch = this.handlechangeSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.a = this.a.bind(this);

    this.state = {
      searchText: '',
      listProduct: [],
      isLoading: false,
      isLoadingCategory: true,
      categories: '',
      Category: '',
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  async componentDidUpdate() {
    const { isLoading } = this.state;
    if (isLoading) {
      this.a();
    }
  }

  handlechangeSearch({ target }) {
    this.setState({ searchText: target.value });
  }

  handleClick = async () => {
    this.setState({ isLoading: true });
  }

  async getAllCategories() {
    const all = await getCategories();
    this.setState({ categories: all, isLoadingCategory: false });
  }

  async a() {
    const { Category, searchText } = this.state;
    const CatRequest = await getProductsFromCategoryAndQuery(Category, searchText);
    this.setState({ listProduct: CatRequest, isLoading: false });
  }

  renderCategory({ target }) {
    this.setState({ isLoading: true, Category: target.id });
  }

  render() {
    const { listProduct, isLoading, isLoadingCategory, categories } = this.state;

    return (
      <div>
        <header className="header-container">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <section>
            <input
              data-testid="query-input"
              onChange={ this.handlechangeSearch }
              className="search-input"
              type="text"
            />
            <button
              data-testid="query-button"
              className="search-button"
              type="button"
              onClick={ this.handleClick }
            >
              Buscar
            </button>
          </section>
        </header>

        { isLoading && <Loading /> }
        { listProduct.length !== 0 && <ProductList products={ listProduct } /> }

        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>

        <nav>
          <Categories
            categoriesProp={ categories }
            isLoadingCategoryProp={ isLoadingCategory }
            renderCategory={ this.renderCategory }
          />
        </nav>
      </div>
    );
  }
}

export default Home;
