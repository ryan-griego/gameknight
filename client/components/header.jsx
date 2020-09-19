import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.setView = this.setView.bind(this);

  }

  setView(e) {
    this.props.view('cart', {});
  }

  render() {
    // const name = "cart";
    // const params = {};
    const itemCheck = this.props.cartItemCount <= 1 ? 'Item' : 'Items';
    return <>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <i className="fas fa-dollar-sign"><h1>Wicked Sales</h1></i>
            <p>{this.props.cartItemCount}{' ' + itemCheck}<i className="fas fa-shopping-cart" onClick={this.setView}></i></p>
          </div>
        </nav>
      </header>
    </>;
  }
}
