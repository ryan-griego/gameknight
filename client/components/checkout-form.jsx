import React from 'react';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      expirationMonth: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitPlaceOrder = this.handleSubmitPlaceOrder.bind(this);
    this.handleClickBackToCatalog = this.handleClickBackToCatalog.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  getTotalPrice() {
    const cart = this.props.cart;
    let convertedTotal = '$';
    if (cart.length === 0) {
      convertedTotal = '$0.00';
      return convertedTotal;
    } else {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
      }
      const stringTotal = total.toString();

      for (let i = 0; i < (stringTotal.length - 2); i++) {
        convertedTotal += stringTotal[i];
      }
      convertedTotal += ('.' + stringTotal.slice(-2));
      return convertedTotal;
    }
  }

  handleSubmitPlaceOrder(event) {
    event.preventDefault();

    const order = {
      name: this.state.name,
      number: this.state.number,
      address: this.state.address
    };

    this.props.order(order);

  }

  handleClickBackToCatalog() {
    this.props.view('catalog', {});
  }

  render() {

    return (
      <div className="container card col-10 col-md-6 mt-5 mb-5 p-3">
        <h1>Checkout</h1>
        <h3 className="text-muted mb-3">Order Total: {this.getTotalPrice()}</h3>
        <h5>Billing Details</h5>
        <div>
          <form id="checkoutForm" onSubmit={this.handleSubmitPlaceOrder} >
            <label className="m-0 " htmlFor="name">First & last name</label>
            <input
              required
              type="text"
              name="name"
              className="form-control mb-4"
              id="name"
              onChange={this.handleChange} />
            <label className="m-0" htmlFor="shipping-address">Address</label>
            <input
              required
              className="form-control mb-3"
              name="address"
              id="shipping-address"
              onChange={this.handleChange}></input>
            <label className="m-0" htmlFor="credit-card"></label>
            <div className="d-flex flex-wrap col-sm-12 p-0">
              <div className="col p-0">
                <label className="m-0" htmlFor="shipping-address">City</label>
                <input
                  required
                  className="form-control mb-4"
                  name="city"
                  id="shipping-address"
                  onChange={this.handleChange}></input>
              </div>
              <div className="col p-0 mx-3">
                <label className="m-0" htmlFor="state">State</label>
                <select
                  required
                  className="custom-select mb-4"
                  name="state"
                  id="state"
                  onChange={this.handleChange}>
                  <option value=''>Select a state</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="California">California</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="IllinoisIndiana">IllinoisIndiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Kentucky">Kentucky</option>
                  <option value="Louisiana">Louisiana</option>
                  <option value="Maine">Maine</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Minnesota">Minnesota</option>
                  <option value="Mississippi">Mississippi</option>
                  <option value="Missouri">Missouri</option>
                  <option value="MontanaNebraska">MontanaNebraska</option>
                  <option value="Nevada">Nevada</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New Mexico">New Mexico</option>
                  <option value="New York">New York</option>
                  <option value="North Carolina">North Carolina</option>
                  <option value="North Dakota">North Dakota</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="PennsylvaniaRhode Island">PennsylvaniaRhode Island</option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Tennessee">Tennessee</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </select>
              </div>
              <div className="col p-0">
                <label className="m-0" htmlFor="zip">Zip Code</label>
                <input
                  required
                  maxLength="5"
                  minLength="5"
                  className="form-control mb-4 col-"
                  name="zipCode"
                  id="zip"
                  onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="mt-4">
              <h5>Payment Method</h5>
              <div className="d-flex flex-wrap align-items-center justify-content-between border rounded px-4 py-3 mb-3 col">
                <div>
                  <input required className="mr-2" name="cc-method" type="radio" />
                  <label className="m-0" htmlFor="cc-method">Credit Card</label>
                </div>
                <div className="col-6 d-flex justify-content-center align-item-center">
                  <img className="object-fit-width" src="./images/credit-cards.png" alt="" />
                </div>
              </div>

              <label htmlFor="credit-card">Card Number</label>
              <input
                required
                minLength="16"
                maxLength="16"
                type="text"
                className="form-control mb-4"
                id="credit-card"
                name="number"
                onChange={this.handleChange} />

              <div className='d-flex flex-wrap'>
                <div className="d-flex flex-wrap col-sm-12 p-0">
                  <label className="col-12 p-0" htmlFor="expMonth">Expiration Date</label>
                  <div className="col-6 pl-0">
                    <select
                      required
                      className="custom-select mb-4"
                      name="expirationMonth"
                      id="expMonth"
                      onChange={this.handleChange}>
                      <option value=""> Month </option>
                      <option value="01"> 01 </option>
                      <option value="02"> 02 </option>
                      <option value="03"> 03 </option>
                      <option value="04"> 04 </option>
                      <option value="05"> 05 </option>
                      <option value="06"> 06 </option>
                      <option value="07"> 07 </option>
                      <option value="08"> 08 </option>
                      <option value="09"> 09 </option>
                      <option value="10"> 10 </option>
                      <option value="11"> 11 </option>
                      <option value="12"> 12 </option>
                    </select>
                  </div>
                  <div className="col-6 pl-0">
                    <select
                      required
                      className="custom-select mb-4"
                      name="expYear"
                      id="expYear"
                      onChange={this.handleChange}>
                      <option value=""> Year </option>
                      <option value="2020"> 2020 </option>
                      <option value="2021"> 2021 </option>
                      <option value="2022"> 2022</option>
                      <option value="2023"> 2023 </option>
                      <option value="2024"> 2024 </option>
                      <option value="2025"> 2025 </option>
                      <option value="2026"> 2026 </option>
                      <option value="2027"> 2027 </option>
                      <option value="2028"> 2028 </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="securityCode">Security Code</label>
                  <input
                    required
                    type="text"
                    className="form-control mb-4"
                    id="securityCode"
                    name="securityCode"
                    onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div className="d-flex mt-4">
              <input required className="mt-1" type="checkbox" id="iAgreeCheckOut" name="iAgreeCheckOut" />
              <label className="m-0 ml-2" htmlFor="iAgreeCheckOut">
                I accept that this website is for demonstration purposes, that
                no payment processing will be done, and that personal information
                such as names, addresses, or real credit card numbers should not
                be used on submission of this form.
              </label>
            </div>
            <div className="d-flex flex-nowrap justify-content-between mt-4 align-items-center">
              <p className="m-0 pointer smaller-text" onClick={this.handleClickBackToCatalog}><i className="fas fa-chevron-circle-left"></i> Continue Shopping</p>
              <button
                type="submit"
                className="btn btn-dk-blue">
                Place Order
              </button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}
