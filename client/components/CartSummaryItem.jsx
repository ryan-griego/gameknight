import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const price = (this.props.cartItem.price / 100).toFixed(2);


    return <>
      <div className="col mb-4">
        <div className="card" style={{ width: '18rem' }} id={this.props.cartItem.productId}>
          <img src={this.props.cartItem.image} className="card-img-top"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.cartItem.name}</h5>
            <p className="card-text">${price}</p>
            <p className="card-text">{this.props.cartItem.shortDescription}</p>
          </div>
        </div>
      </div>
    </>;

  }

}
