import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(response => response.json())
      .then(data => this.setState({ product: data }))
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  render() {
    return this.state.product
      ? <h1>Loading product details...</h1>
      : <><h2>This area should display the product details as displayed on the github link</h2></>;

  }

}
