import React from 'react';

export default class Header extends React.Component {
  render() {
    return <>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <i className="fas fa-dollar-sign"><h1>Wicked Sales</h1></i>
          </div>
        </nav>
      </header>
    </>;
  }
}