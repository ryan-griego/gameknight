import React from 'react';
import CartSummaryItem from './CartSummaryItem';

export default class CartSummary extends React.Component {

  render() {
    const cartItems = this.props.cartItems;
    return (
      <div>
        {
          cartItems.map(cartItem => {
            return <CartSummaryItem
              key={cartItem.productId}
              cartItem={cartItem}
              image={cartItem.image}
              name={cartItem.name}
              productId={cartItem.productId}
              price={cartItem.price}
              shortDescription={cartItem.shortDescription}
              view={this.setView} />;
          })
        }
      </div>
    );
  }
}
