import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.setViewCheckout = this.setViewCheckout.bind(this);
  }

  getTotalPrice() {
    console.log('get the this.props in getTotalPrice', this.props);
    const items = this.props.items;
    console.log('log the this.props.quantities in getTotalPrice', items);
    let convertedTotal = '$';
    if (items.length === 0) {
      convertedTotal = '$0.00';
      return convertedTotal;
    } else {
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total = total + (items[i].count * items[i].price);
      }
      const stringTotal = total.toString();

      for (let i = 0; i < (stringTotal.length - 2); i++) {
        convertedTotal += stringTotal[i];
      }
      convertedTotal += ('.' + stringTotal.slice(-2));
      return convertedTotal;
    }
  }

  setView(e) {
    this.props.view('catalog', {});
  }

  setViewCheckout(e) {
    this.props.view('checkout', {});
  }

  componentDidMount() {
    this.props.getCartItems();
  }

  cartCheck() {
    if (this.props.items.length <= 0) {
      return (
        <div className="card col-12 text-center text-muted pt-2 pb-2">
          <h3 className="m-0">No items in cart</h3>
        </div>
      );
    }
  }

  checkoutCheck() {
    if (this.props.items.length > 0) {
      return (
        <button type="button" className="float-right btn btn-primary" onClick={this.setViewCheckout} style={{ cursor: 'pointer', height: '25%' }}>Checkout</button>
      );
    }
  }

  render() {

    return (
      <>
        <div className="container">
          <div>
            <p className="pointer col-sm-3 pt-3 pl-0 pr-0" style={{ cursor: 'pointer' }} onClick={this.setView}><i className="fas fa-chevron-circle-left"></i> Back to catalog</p>
            <h1>My Cart</h1>
          </div>
          <div className="d-flex flex-wrap justify-content-between mt-5">
            {this.cartCheck()}
            {this.props.items.map((product, index) => {
              console.log('log the mapped items in cart', product);
              return <CartSummaryItem
                key={index}
                product={product}
                quantities={this.props.items}
                deleteItem={this.props.deleteItem}
                cartItems={this.props.cartItems}
                add={this.props.add}
                handleClickIncreaseQuantity={this.props.handleClickIncreaseQuantity}
                handleClickDecreaseQuantity={this.props.handleClickDecreaseQuantity}
                image={product.image}/>;
            })}
          </div>
          <div className="d-flex flex-nowrap justify-content-between">
            <h3 className="mb-5">Cart Total: {this.getTotalPrice()}</h3>
            {this.checkoutCheck()}
          </div>
        </div>
      </>
    );
  }
}
