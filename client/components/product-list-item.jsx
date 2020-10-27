import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const price = (this.props.product.price / 100).toFixed(2);

    return <>
        <div className="card item-card shadow-sm mb-3 pb-3 pointer overflow-hidden" onClick={this.props.view} id={this.props.product.productId}>
          <img src={this.props.product.image} className="card-img-top pointer mt-4 grow"></img>
          <div className="card-body pointer d-flex flex-wrap">
            <h5 className="card-title">{this.props.product.name}</h5>
            <p className="card-text">${price}</p>
            <p className="card-text">{this.props.product.shortDescription}</p>
          </div>
        </div>
    </>;
  }
}
