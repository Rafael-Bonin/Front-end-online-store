import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import '../App.css';

class Home extends React.Component {
  constructor() {
    super();

    this.handlechangeSearch = this.handlechangeSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);

    this.state = {
      searchText: '',
      listProduct: [],
      isLoading: false,
      isLoadingCategory: true,
      categories: '',
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  handlechangeSearch({ target }) {
    this.setState({ searchText: target.value });
  }

  handleClick = async () => {
    const { Categorie, searchText } = this.state;
    this.setState({ isLoading: true }, async () => {
      const CatRequest = await getProductsFromCategoryAndQuery(Categorie, searchText);
      this.setState({
        isLoading: false,
        listProduct: CatRequest,
      });
    });
  }

  async getAllCategories() {
    const all = await getCategories();
    this.setState({ categories: all, isLoadingCategory: false });
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
          <ul>
            { isLoadingCategory ? <Loading /> : categories.map((category) => (
              <li key={ category.id } className="tira-ponto">
                <label htmlFor="category" data-testid="category">
                  { category.name }
                  <input type="radio" key={ category.id } name="category" />
                </label>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Home;
