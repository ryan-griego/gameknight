import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

  }
  // Define a method in the App component named placeOrder that takes an Object with name, creditCard, and shippingAddress properties and sends them in a POST request to "/api/orders" before resetting App's cart state to an empty Array. placeOrder should also change the App's view state back to { name: 'catalog', params: {} }

  placeOrder(order) {
    event.preventDefault();

    fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({ statusMessage: 'Order added ' });
          this.setState({ cart: [] });
          this.setView('catalog', {});
          response.json();

        }
        if (response.status === 400) {
          console.error('There is something wrong with your place order request');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }))
      .catch(error => {
        console.error('There was a problem with your fetch operation in getCartItems: ', error);
      });
  }

  addToCart(product) {
    product = this.state.view.params;
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(() => this.getCartItems())
      .catch(error => {
        console.error('Error:', error);
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params
      }
    });
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const viewType = this.state.view.name;
    const allPrices = this.state.cart.map(item => item.price);
    const totalPrice = allPrices.reduce((a, b) => a + b, 0);

    if (viewType === 'catalog') {
      return (
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            view={this.setView}/>
          <ProductList view={this.setView} />
        </div>
      );
    } else if (viewType === 'details') {
      return (
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            view={this.setView}/>
          <ProductDetails
            product={this.props.product}
            view={this.setView}
            viewParams={this.state.view.params}
            add={this.addToCart} />
        </div>
      );
    } else if (viewType === 'cart') {
      return (
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            view={this.setView} />
          <CartSummary
            product={this.props.product}
            cartItemCount={this.state.cart.length}
            view={this.setView}
            cart={this.state.cart}
            viewParams={this.state.view.params}
            totalCost={totalPrice}/>
        </div>
      );
    } else if (viewType === 'checkout') {
      return (
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            view={this.setView} />
          <CheckoutForm
            order={this.placeOrder}
            view={this.setView}
            totalCost={totalPrice}
          />
        </div>
      );
    }
  }
}
