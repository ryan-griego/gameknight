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
    this.setView.bind = this.setView.bind(this);
  }

  setView(name,params) {
    console.log("You clicked a product");
    this.setState({
      view: { name: name, params: params}
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { view { name, params } } = this.state;
      return

         if(this.state.view.name == "catalog") {
            <><Header /><ProductDetails view={this.setView} /></>
         } else if(this.state.view.name == "details") {
           <><Header /><ProductList view ={this.setView}/></>
         }


    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <><Header /><ProductList view={this.setView}/></>;
  }
}
