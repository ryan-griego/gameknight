import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []

    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
      .catch(error => {
        console.lerror('There was a problem with your fetch GET operation: ', error);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {


    return (
      <ul>
        {
          this.state.products.map(product => {
            return <ProductListItem key={product.id} product={product} />;
          })
        }
      </ul>
    );



  }
}
