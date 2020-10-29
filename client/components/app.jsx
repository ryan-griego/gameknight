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
      product: {},
      cart: [],
      cartQuantity: [],
      hide: '',
      showModal: '',
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleCloseOpeningModal = this.handleCloseOpeningModal.bind(this);
    this.handleClickIncreaseQuantity = this.handleClickIncreaseQuantity.bind(this);
    this.handleClickDecreaseQuantity = this.handleClickDecreaseQuantity.bind(this);
  }

  handleCloseOpeningModal(event) {
    event.preventDefault();
    this.setState({
      fadeOut: 'fade-out'
    });
    setTimeout(() => {
      this.setState({
        showModal: 'display-none'
      });
    }
    , 1000);

  }

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
          this.setState({ cartQuantity: [] });

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

  // getCartItems() {
  //   fetch('/api/cart')
  //     .then(response => response.json())
  //     .then(data => this.setState({ cart: data }))
  //     .catch(error => {
  //       console.error('There was a problem with your fetch operation in getCartItems: ', error);
  //     });
  // }

  getCartItems() {
    Promise.all([
      fetch('/api/cart')
        .then(res => res.json()),
      fetch('/api/cart/quantity')
        .then(res => res.json())
    ])
      .then(data => {
        console.log('log the data coming from getCartItems', data);

        this.setState({
          cart: data[0],
          cartQuantity: data[1]
        });
      })
      .catch(err => console.error(err));
  }

  addToCart(product, quantity) {
    console.log('log the product being passed into addToCart', product);
    console.log('log the quantity being passed into addToCart', quantity);
    console.log('log this.state.cart in app.jsx', this.state.cart);
    this.setState({ product: product });
    // product = this.state.view.params;
    console.log('log the product added to cart', product);

    for (let i = 0; i < quantity; i++) {

      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(response => response.json())
        .then(newItem => {
          console.log('log the newItem in addToCart', newItem);
          const currentCart = this.state.cart.slice();
          const newCart = currentCart.concat(newItem);
          this.setState({ cart: newCart });

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  deleteItem(productId) {
    const remove = {
      method: 'DELETE'
    };
    fetch(`/api/cart/${productId}`, remove)
      .then(res => res.json())
      .then(data => {
        const currentCart = this.state.cart.slice();
        const newCart = [];
        while (currentCart.length > 0) {
          if (data[0].productId === currentCart[0].productId) {
            currentCart.splice(0, 1);
          } else {
            newCart.push(currentCart[0]);
            currentCart.splice(0, 1);
          }
        }
        const newQuantityArray = this.state.cartQuantity.slice();
        for (let i = 0; i < newQuantityArray.length; i++) {
          if (data[0].productId === newQuantityArray[i].productId) {
            newQuantityArray.splice(i, 1);
          }
        }
        this.setState({
          cart: newCart,
          cartQuantity: newQuantityArray
        });
      })
      .catch(err => console.error(err));
  }

  handleClickDecreaseQuantity(productId) {
    console.log('log the productId being passed into handleClickDecreaseQuantity', productId);
    for (let i = 0; i < this.state.cartQuantity.length; i++) {
      if (productId === this.state.cartQuantity[i].productId) {
        const quantity = parseInt(this.state.cartQuantity[i].count) - 1;
        const newCartQuantity = this.state.cartQuantity.slice();
        newCartQuantity[i].count = quantity;
        this.setState({ cartQuantity: newCartQuantity });
        break;
      }
    }
    for (let i = 0; i < this.state.cart.length; i++) {
      if (productId === this.state.cart[i].productId) {
        const cartItemId = this.state.cart[i].cartItemId;
        const remove = {
          method: 'DELETE'
        };
        fetch(`/api/cartItem/${cartItemId}`, remove)
          .then(() => {
            const newCart = this.state.cart.slice();
            newCart.splice([i], 1);
            this.setState({
              cart: newCart
            });
          })
          .catch(err => console.error(err));
        break;
      }
    }
  }

  handleClickIncreaseQuantity(product) {
    for (let i = 0; i < this.state.cartQuantity.length; i++) {
      if (product.productId === this.state.cartQuantity[i].productId) {
        const quantity = parseInt(this.state.cartQuantity[i].count) + 1;
        const newCartQuantity = this.state.cartQuantity.slice();
        newCartQuantity[i].count = quantity;
        this.setState({ cartQuantity: newCartQuantity });
        break;
      }
    }
    this.addToCart(product, 1);
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
    this.setState({ showModal: '' });
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
            view={this.setView} />
          <ProductList view={this.setView}
            showModal={this.state.showModal}
            fadeOut={this.state.fadeOut}
            closeModal={this.handleCloseOpeningModal} />
        </div>
      );
    } else if (viewType === 'details') {
      return (
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            view={this.setView} />
          <ProductDetails
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
            view={this.setView}
            cartItems={this.state.cart}
            items={this.state.cartQuantity}
            viewParams={this.state.view.params}
            totalCost={totalPrice}
            deleteItem={this.deleteItem}
            getCartItems={this.getCartItems}
            add={this.addToCart}
            handleClickIncreaseQuantity={this.handleClickIncreaseQuantity}
            handleClickDecreaseQuantity={this.handleClickDecreaseQuantity} />
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
            cart={this.state.cart}
            totalCost={totalPrice}
          />
        </div>
      );
    }
  }
}
