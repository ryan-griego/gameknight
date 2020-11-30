import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.setView = this.setView.bind(this);
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  setView(e) {
    const productId = e.currentTarget.getAttribute('id');
    const findAddButton = e.target.className === 'btn col-12 px-2 blue-button first-add';

    if (findAddButton) {
      e.preventDefault();
      this.props.view('catalog', { });

    } else {
      this.props.view('details', { productId });
    }

  }

  render() {
    return (
      <div className="container d-flex flex-wrap justify-content-between mt-5 mb-5 fade-in" id="top-products">
        <div className={`${this.props.showModal} `}>
          <div className={`opening-modal a d-flex justify-content-center align-items-center ${this.props.fadeOut} `}>
            <div className="modal-dialog fade-in">
              <div className="modal-content slide-in">
                <div className="modal-header header d-flex justify-content-center">
                  <h4 className="text-center m-0 p-0" >Welcome to GameKnight!</h4>
                </div>
                <div className="modal-body ">
                  <p className="px-3">
                    Please note that this website is a content management application
                    created for the purpose of demonstration. Check the box below to
                    acknowledge that the merchandise shown here is not available for
                    purchase, that you will not provide genuine financial or personal
                    information, and that you are aware no purchase will truly be
                    processed.
                  </p>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <form action="submit" onSubmit={this.props.closeModal}>
                    <div className="d-flex container">

                      {/* <label className="m-0 ml-2 custom-control-label" htmlFor="agreed"><input required className="mr-2 custom-control-input-green" type="checkbox" id="acknowledge" name="agreed" />I acknowledge that this is strictly a demo application</label> */}

                      <div className="custom-control custom-checkbox custom-checkbox-blue" htmlFor="agreed">
                        <input required type="checkbox" className="mr-2 custom-control-input custom-control-input-blue" id="acknowledge" name="agreed"/>
                        <label className="m-0 ml-2 custom-control-label" htmlFor="acknowledge">I acknowledge that this is strictly a demo application</label>
                      </div>

                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-dk-blue mt-3" >Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.products.map(product => {
            return <ProductListItem
              key={product.productId}
              product={product}
              name={product.name}
              productId={product.productId}
              price={product.price}
              view={this.setView}
              add={this.props.add}/>;
          })
        }
      </div>
    );
  }
}
