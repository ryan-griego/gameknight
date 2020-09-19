import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const cartItem = this.props.product;

    return <>
      <p>{cartItem.name}</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </>;

  }

}
