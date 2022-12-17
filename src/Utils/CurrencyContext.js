import React, { Component, createContext } from "react";
import { GET_CURRENCIES } from "../GraphQL/dataQueries";
import { client } from "../GraphQL/apolloClient";

const CurrencyContext = createContext(true);
export class CurrencyProvider extends Component {
  state = {
    selectCurrency: false,
    selectCurrencySymbol: null,
  };
  // componentDidMount() {
  //   client
  //     .query({ query: GET_CURRENCIES })
  //     .then((result) => {
  //       if (localStorage.getItem("currency")) {
  //         const currency = JSON.parse(localStorage.getItem("currency"));
  //         this.setState({
  //           selectCurrency: currency.label,
  //           selectCurrencySymbol: currency.symbol,
  //         });
  //       } else if (localStorage.getItem("currency") === {}) {
  //         const currency = result.data;
  //         this.setState({
  //           selectCurrency: currency.label,
  //           selectCurrencySymbol: currency.symbol,
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  onSelectChange = (event) => {
    this.setState({ selectCurrency: event.target.value });
  };
  setLocalStorage = (currency) => {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        selectCurrency: currency,
      })
    );
  };
  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("currency"));
  };
  onSelectCurrency = (currency) => {
    this.setLocalStorage(currency);
  };
  render() {
    const { children } = this.props;
    const OnselectCurrency = this.onSelectCurrency;
    const onChange = this.onSelectChange;
    const { selectCurrency } = this.state;
    console.log(selectCurrency);
    return (
      <CurrencyContext.Provider
        value={{ OnselectCurrency, selectCurrency, onChange }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
