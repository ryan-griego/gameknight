import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const price = (this.props.cartItem.price / 100).toFixed(2);

    return <>
      <div className="row">
        <div className="col-md-4">
          <img src={this.props.cartItem.image} className="card-img-top"></img>
        </div>
        <div className="col-md-8 mt-5">
          <h5 className="card-title">{this.props.cartItem.name}</h5>
          <p className="card-text">${price}</p>
          <p className="card-text">{this.props.cartItem.shortDescription}</p>
        </div>
      </div>
    </>;

  }

}
