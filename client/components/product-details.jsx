import React from 'react';
import Quantity from './quantity-control';
import Carousel from './carousel';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      images: [],
      quantity: 1,
      mainImage: ''
    };
    this.setView = this.setView.bind(this);
    this.handleClickQuantityIncrease = this.handleClickQuantityIncrease.bind(this);
    this.handleClickQuantityDecrease = this.handleClickQuantityDecrease.bind(this);
    this.handleClickSelectMainImage = this.handleClickSelectMainImage.bind(this);
  }

  handleClickQuantityIncrease() {
    const quantityIncrease = this.state.quantity;
    this.setState({
      quantity: (quantityIncrease + 1)
    });
  }

  handleClickQuantityDecrease() {
    const quantityIncrease = this.state.quantity;
    if (this.state.quantity > 0) {
      this.setState({
        quantity: (quantityIncrease - 1)
      });
    }
  }

  handleClickSelectMainImage(path) {
    this.setState({
      mainImage: path
    });
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(response => response.json())
      .then(data => {
        const imageArray = data.image.split(',');
        this.setState({
          product: data,
          images: imageArray,
          mainImage: imageArray[0]
        });
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  setView(e) {
    this.props.view('catalog', {});
  }

  render() {
    if (!this.state.product) return null;
    return (
      <div className="container container-iphone-678-landscape mt-3 mb-5">
        <div className="col-sm-5 pt-3 pl-3 spacing">
          <p className="pointer" onClick={this.setView}><i className="fas fa-chevron-circle-left"></i> Back to catalog</p>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="card col-sm col-md-7 col-lg d-flex justify-content-around detail-image-display-container">
            <div className=" d-flex">
              <img className="col-12 detail-image-display align-self-center" src={this.state.product.image} alt="" />
            </div>
          </div>
          <div className="card col-sm col-md-5 col-lg-4 d-flex flex-wrap flex-column justify-content-center py-4 px-0">
            <div className="px-4">
              <h2>{this.state.product.name}</h2>
              <h3 className="mt-3">${(this.state.product.price / 100).toFixed(2)}</h3>
              <p> {this.state.product.shortDescription}</p>

              <button className="btn px-2 mt-4 btn-primary"
                onClick={this.props.add}>
                Add to Cart
                </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
