import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleClickAddToCart = this.handleClickAddToCart.bind(this);
  }

  handleClickAddToCart() {
    this.props.add(this.props.product, 1);
  }

  render() {
    const image = this.props.product.image.split(',');
    const price = (this.props.product.price / 100).toFixed(2);

    return <>
      <div className="card item-card shadow-sm mb-3 pb-3 pointer overflow-hidden" onClick={this.props.view} id={this.props.product.productId}>
        <img src={image[0]} className="card-img-top pointer mt-4 grow"></img>
        <div className="card-body pointer d-flex flex-wrap">
          <h5 className="card-title">{this.props.product.name}</h5>
          <p className="text-muted pointer col-12 p-0">${price}</p>
          <p className="card-text">{this.props.product.shortDescription}</p>
          <button className="btn col-12 px-2 blue-button first-add" onClick={this.handleClickAddToCart}>Add to Cart</button>

        </div>

      </div>
    </>;
  }
}
