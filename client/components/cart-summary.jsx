import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.setViewCheckout = this.setViewCheckout.bind(this);
  }

  setView(e) {
    this.props.view('catalog', {});
  }

  setViewCheckout(e) {
    this.props.view('checkout', {});
  }

  render() {
    const totalPrice = (this.props.totalCost / 100).toFixed(2);
    const messageCheck = this.props.cartItemCount <= 0 ? 'There are no products in the cart.' : '';
    const cartCheck = this.props.cartItemCount <= 0 ? '' : `Cart Total: $${totalPrice}`;

    return (
      <>
        <div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 mt-5">
              <div className="card-deck">
                {messageCheck}

                {this.props.cart.map(cartItem => {
                  return <CartSummaryItem
                    key={cartItem.cartItemId}
                    cartItem={cartItem}
                    image={cartItem.image}
                    productId={cartItem.productId}
                    price={cartItem.price}
                    shortDescription={cartItem.shortDescription}
                    view={this.props.view} />;
                })}

              </div>
              <h4 className="mt-5 float-left">{cartCheck}</h4>

            </div>
            <div className="hover text-muted my-3 px-0 btn d-flex justify-content-start float-left" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to catalog</div>

            <button type="button" className="float-right btn btn-primary" onClick={this.setViewCheckout} style={{ cursor: 'pointer' }}>Checkout</button>

          </div>
        </div>
      </>
    );
  }
}
