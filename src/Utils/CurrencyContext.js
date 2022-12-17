import React, { Component, createContext } from "react";
import { GET_CURRENCIES } from "../GraphQL/dataQueries";
import { client } from "../GraphQL/apolloClient";

const CurrencyContext = createContext(true);
export class CurrencyProvider extends Component {
  state = {
    selectCurrency: false,
  };

  onSelectChange = (event) => {
    this.setState({ selectCurrency: event.target.value });
  };
  // setLocalStorage = (currency) => {
  //   localStorage.setItem(
  //     "currency",
  //     JSON.stringify({
  //       selectCurrency: currency,
  //     })
  //   );
  // };
  // getLocalStorage = () => {
  //   return JSON.parse(localStorage.getItem("currency"));
  // };
  // onSelectCurrency = (currency) => {
  //   this.setLocalStorage(currency);
  // };
  render() {
    const { children } = this.props;
    // const OnselectCurrency = this.onSelectCurrency;
    const onChange = this.onSelectChange;
    const { selectCurrency } = this.state;

    return (
      <CurrencyContext.Provider value={{ selectCurrency, onChange }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
