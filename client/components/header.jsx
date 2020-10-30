import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
  }

  setView(e) {
    this.props.view('cart', {});
  }

  render() {
    const itemCheck = this.props.cartItemCount <= 1 ? 'Item' : 'Items';
    return <>
      <header>
        <nav className="navbar navbar-dark bg-knight">
          <div className="container">
            <h6 className="m-0">
              <i className="fas fa-chess-knight pr-2"> GameKnight</i>
            </h6>
            <p className="m-0" onClick={this.setView} style={{ cursor: 'pointer' }}>{this.props.cartItemCount}{' ' + itemCheck}<i className="fas fa-shopping-cart mr-3 ml-2"></i></p>
          </div>
        </nav>
      </header>
    </>;
  }
}
