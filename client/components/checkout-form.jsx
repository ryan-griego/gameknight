import React from 'react';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      address: ''
    };
    this.setView = this.setView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

    event.preventDefault();

    const order = {
      name: this.state.name,
      number: this.state.number,
      address: this.state.address
    };
    this.props.order(order);
  }

  setView(e) {
    this.props.view('catalog', {});
  }

  render() {

    const totalPrice = (this.props.totalCost / 100).toFixed(2);

    return (
      <>
        <div className="container">
          <h2>My Cart</h2>
          <p className="text-muted">{`Order Total: $${totalPrice}`}</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="cc">Credit Card Number:</label>
              <input type="text" name="number" className="form-control" id="number" value={this.state.creditCard} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea name="address" className="form-control" id="address" rows="3" value={this.state.shippingAddress} onChange={this.handleChange}></textarea>
            </div>
            <div className="float-left hover text-muted my-3 px-0 btn d-flex justify-content-start" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to catalog</div>

            <button type="submit" className="btn btn-primary float-right">Place Order</button>
          </form>

        </div>
      </>
    );
  }
}
