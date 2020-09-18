import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import { response } from 'express';

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
  }

  getCartItems() {
    fetch('/api/cart')
      .then(reponse => response.json())
      .then(data => this.setState({ cart: data }))
      .catch(error => {
        console.error('There was a problem with your fetch operation in getCartItems: ', error);
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
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  render() {
    const viewType = this.state.view.name;

    if (viewType === 'catalog') {
      return (
        <div>
          <Header/>
          <ProductList view={this.setView} />
        </div>
      );
    } else if (viewType === 'details') {
      return (
        <div>
          <Header/>
          <ProductDetails
            product={this.props.product}
            view={this.setView}
            viewParams={this.state.view.params} />
        </div>
      );
    }
  }
}
