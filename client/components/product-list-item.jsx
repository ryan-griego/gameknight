import React from 'react';

export default class ProductListItem extends React.Component {
  render() {

    return <>
      <div className="card" style={{ width: '18rem' }}>
        <img src={'../../server/public/images/ostrich-pillow.jpg'} className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <p className="card-text">$0.00</p>
          <p className="card-text">Short description of the product</p>
        </div>
      </div>
    </>;
  }
}
