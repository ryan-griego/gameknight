import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.convertedPrice = this.convertedPrice.bind(this);
    this.convertImage = this.convertImage.bind(this);
    this.totalItemPrice = this.totalItemPrice.bind(this);
    this.disableDecreaseButton = this.disableDecreaseButton.bind(this);
    this.muteDecreaseButton = this.muteDecreaseButton.bind(this);
  }

  convertImage() {
    const imageArray = this.props.product.image.split(',');
    return imageArray[0];
  }

  convertedPrice() {
    const price = ' ' + this.props.product.price;
    let convertedPrice = '$';
    if (price.length < 4) {
      for (let i = 0; i < (price.length - 2); i++) {
        convertedPrice += (price[i] + '.');
        convertedPrice += price.slice(0, 2);

      }

    } else if (price.length > 4) {
      convertedPrice += (price.slice(0, -2) + '.' + price.slice(-2));
    } else {
      convertedPrice += (price.slice(0, 2) + '.' + price.slice(2, 4));
    }
    return convertedPrice;
  }

  totalItemPrice() {
    const singlePrice = parseFloat(this.convertedPrice().slice(1), 1);
    const totalItemPrice = (singlePrice * this.props.product.count).toFixed(2);
    return '$' + totalItemPrice;
  }

  disableDecreaseButton() {
    return (this.props.product.count < 2);
  }

  muteDecreaseButton() {
    return (this.props.product.count < 2)
      ? 'border col-2 d-flex justify-content-center white-bg px-4 muted-button'
      : 'border col-2 d-flex justify-content-center white-bg px-4';
  }

  componentDidMount() {
    console.log('log this.props in componentDidMount', this.props);
    fetch(`/api/products/${this.props.product.productId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log('log this.props in render in cart-summary', this.props);
    console.log('log this.props.quantities in render in cart-summary', this.props.quantities);
    console.log('log this.props.product in render in cart-summary', this.props.product);
    console.log('log this.props.cartItems in render in cart-summary', this.props.cartItems);

    console.log('log this.props.product in render in cart-summary', this.props.product);
    console.log('log this.props.product.count in render in cart-summary', this.props.product.count);

    const price = (this.props.product.price / 100).toFixed(2);
    return <>
      <div className="card mb-5">
        <div className="row no-gutters p-2 pt-3  d-flex justify-content-around shadow-sm align-items-center">
          <div className="col-sm-2 mr-3">
            <img className="cart-image" src={this.convertImage()} alt="" />
          </div>
          <div className="col-sm-2">
            <p className="font-weight-bold m-0">{this.props.product.name}</p>
            {/* <p className="text-muted cart-item-number">Item# {this.props.cartItem.itemnum}</p> */}
            <p className="text-muted cart-item-number">QTY: {this.props.product.count}</p>
            <p className="font-weight-bold">{this.convertedPrice()}</p>
          </div>
          <div className="d-flex col-sm-6 align-items-center justify-content-center">
            <div className="col-12 d-flex justify-content-center">
              <div className="d-flex col-10">
                <button
                  className={this.muteDecreaseButton()}
                  onClick={() => this.props.handleClickDecreaseQuantity(this.props.product.productId)}
                  disabled={this.disableDecreaseButton()}>
                  <i className="fas fa-minus fa-sm align-self-center"></i>
                </button>
                <div className="border-top border-bottom col d-flex justify-content-center">
                  <h5 className="text-center align-self-center m-0 py-2">{this.props.product.count}</h5>
                </div>
                <button
                  className="border col-2 d-flex justify-content-center white-bg px-4"
                  onClick={() => this.props.handleClickIncreaseQuantity(this.props.product)}>
                  <i className="fas fa-plus fa-sm align-self-center"></i>
                </button>
              </div>
              <button className="btn" onClick={() => this.props.deleteItem(this.props.product.productId)}>
                <i className="far fa-trash-alt col-2"></i>
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center col">
            <h4 className="text-center">{this.totalItemPrice()}</h4>
          </div>
        </div>
      </div>
    </>;

  }

}
