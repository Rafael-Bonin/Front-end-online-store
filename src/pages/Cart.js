import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
    };
    this.getProducts = this.getProducts.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
    this.decrementItem = this.decrementItem.bind(this);
    this.updateProductSoma = this.updateProductSoma.bind(this);
    this.updateProductSub = this.updateProductSub.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const getAll = JSON.parse(localStorage.getItem('products'));
    this.setQtdPrice(getAll);
    this.setState({ allProducts: getAll || [] });
  }

  setQtdPrice(storage) {
    if (storage !== null) {
      const res = storage.reduce((acc, prod) => {
        prod.qtdProduct = 1;
        prod.preco = prod.price;
        acc.push(prod);
        return acc;
      }, []);
      this.setState({
        allProducts: res,
      });
    }
  }

  updateProductSub(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        prod.price -= product.preco;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState({
      allProducts: res,
    });
  }

  updateProductSoma(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        prod.price += product.preco;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState({
      allProducts: res,
    });
  }

  incrementItem(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        product.qtdProduct += 1;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState(
      {
        allProducts: res,
      },
      this.updateProductSoma(product),
    );
  }

  decrementItem(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        product.qtdProduct -= 1;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState(
      {
        allProducts: res,
      },
      () => this.updateProductSub(product),
    );
  }

  render() {
    const { allProducts } = this.state;
    return (
      <div>
        {allProducts.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <ul>
            {allProducts.map((product) => (
              <li className="card" key={ product.id }>
                <section data-testid="product-detail-link">
                  <p
                    className="card-title"
                    data-testid="shopping-cart-product-name"
                  >
                    {product.title}
                  </p>
                  <img
                    className="image-card"
                    src={ product.thumbnail }
                    alt={ product.title }
                  />

                  <p className="card-price">
                    {`Valor: R$${product.price.toFixed(2)}`}
                  </p>

                  <button
                    onClick={ () => this.incrementItem(product) }
                    type="button"
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {product.qtdProduct}
                  </p>
                  {product.qtdProduct === 1 ? (
                    <button
                      onClick={ () => this.decrementItem(product) }
                      type="button"
                      data-testid="product-decrease-quantity"
                      disabled
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={ () => this.decrementItem(product) }
                      type="button"
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                  )}
                  <button type="button">X</button>
                  <button type="button">Finalizar Compra</button>
                </section>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Cart;
