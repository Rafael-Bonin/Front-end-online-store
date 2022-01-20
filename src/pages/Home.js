import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import '../App.css';

class Home extends React.Component {
  constructor() {
    super();

    this.handlechangeSearch = this.handlechangeSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      searchText: '',
      listProduct: [],
      isLoading: true,
      isVazio: false,
    };
  }

  handlechangeSearch({ target }) {
    this.setState({ searchText: target.value });
  }

  handleClick = async () => {
    const { Categorie, searchText } = this.state;
    const CategorieRequest = await getProductsFromCategoryAndQuery(Categorie, searchText);
    this.setState({
      isLoading: false,
      listProduct: CategorieRequest,
      isVazio: CategorieRequest.length === 0,
    });
  }

  render() {
    const { listProduct, isLoading, isVazio } = this.state;

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
        {/* { console.log(listProduct) }
        não estou conseguindo tirar o true da variavel isLoading para sumir o carregando inicial e nem o false da variavel isVazio para aparecer a frase quando não tem produto
        { console.log(loading) } */}
        {/* { console.log(isVazio) } */}
        { isVazio && <h1>Nenhum produto foi encontrado</h1> }
        { isLoading ? <Loading /> : <ProductList products={ listProduct } /> }

        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>

      </div>
    );
  }
}

export default Home;
