import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: "catalog", params: {} }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name,params) {

    this.setState({
      view: { name: "details", params: {productId: 2}}
    });

    console.log("You clicked a product");
    console.log("Log the state of view.name", this.state.view.name);
    console.log("Log the state of view.params", this.state.view.params);

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { params } = this.state.view;
    const name = this.state.view.name;

    // console.log("log the params", name);
      // return

        //  if(this.state.view.name == "catalog") {
        //     <><Header /><ProductDetails view={this.setView} /></>
        //  } else if(this.state.view.name == "details") {
        //    <><Header /><ProductList view={this.setView} params={this.state.view.params}/></>
        //  }


    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <><Header /><ProductList view={this.setView}/></>;
  }
}
