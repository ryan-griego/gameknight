import React from 'react';
import CartSummaryItem from './CartSummaryItem';

export default class CartSummary extends React.Component {


  render() {
    return (
      <>
      <div>
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
      </>
    );
  }
}
