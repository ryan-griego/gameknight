import React from 'react';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: 0,
      shippingAddress: ''
    };
    this.setView = this.setView.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeCC(event) {
    this.setState({ creditCard: event.target.value });
    console.log("log creditCard", this.state.creditCard);

  }

  handleChangeAddress(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();
    console.log("log the event in checkout-form", event);
    console.log("log the event in checkout-form", event);

let order = {
      name:this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    }
    console.log("log this.props", this.props);
    console.log("log this.state", this.state);




    this.props.order(order);
  }


  componentDidMount() {
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
              <input type="name" className="form-control" id="name" value={this.state.name} onChange={this.handleChangeName}/>
         </div>

            <div className="form-group">
              <label htmlFor="cc">Credit Card Number:</label>
              <input type="number" className="form-control" id="cc" value={this.state.password} onChange={this.handleChangeCC}/>
            </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
              <textarea className="form-control" id="address" rows="3" value={this.state.shippingAddress} onChange={this.handleChangeAddress}></textarea>
         </div>
            <div className="float-left hover text-muted my-3 px-0 btn d-flex justify-content-start" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to catalog</div>

              <button type="submit" className="btn btn-primary float-right">Place Order</button>

</form>

      </div>
      </>
    );
  }
}
