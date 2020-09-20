import React from 'react';
import CartSummaryItem from './CartSummaryItem';

export default class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
  }

  setView(e) {
    this.props.view('catalog', {});
  }

  render() {
    const totalPrice = (this.props.totalCost / 100).toFixed(2);

    return (
      <>
        <div>
          <div className="container">
            <div className="hover text-muted my-3 px-0 btn d-flex justify-content-start" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to catalog</div>
            <div className="row row-cols-1 row-cols-md-2 mt-5">
              <div className="card-deck">

                {
                  this.props.cart.map(cartItem => {
                    return <CartSummaryItem
                      key={cartItem.productId}
                      cartItem={cartItem}
                      image={cartItem.image}
                      productId={cartItem.productId}
                      price={cartItem.price}
                      shortDescription={cartItem.shortDescription}
                      view={this.props.view} />;
                  })
                }
              </div>
            </div>
            <h4 className="mt-5">Cart Total: ${totalPrice}</h4>
          </div>
        </div>
      </>
    );
  }
}
