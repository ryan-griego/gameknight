import React from 'react';

export default class Header extends React.Component {

  render() {
    const itemCheck = this.props.cartItemCount <= 1 ? 'Item' : 'Items';
    return <>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <i className="fas fa-dollar-sign"><h1>Wicked Sales</h1></i>
            <p>{this.props.cartItemCount}{' ' + itemCheck}<i className="fas fa-shopping-cart"></i></p>
          </div>
        </nav>
      </header>
    </>;
  }
}
