import React, { Component, createContext } from "react";
import { client } from "../GraphQL/apolloClient"
import { GET_CURRENCIES } from "../GraphQL/dataQueries";
const CurrencyContext = createContext(true);
export class CurrencyProvider extends Component {
  state = {
    selectedCurrency: null,
    selectedCurrencySymbol: null,
  };

  // onSelectChange = (event) => {
  //   this.setState({ selectCurrency: event.target.value });
  // };
  // componentDidMount() {

  //   const currency = this.getLocalStorage();
  //   this.setState({
  //     selectedCurrency: currency.label,
  //     selectedCurrencySymbol: currency.symbol,
  //   });

  // }

  componentDidMount() {
    client
      .query({ query: GET_CURRENCIES })
      .then((result) => {
        if (!localStorage.getItem("currency")) {
          const currency = result.data.currencies[0];
          console.log(currency)
          this.setState({
            selectedCurrency: currency.label,
            selectedCurrencySymbol: currency.symbol,
          });
        } else {
          const currency = this.getLocalStorage();
          this.setState({
            selectedCurrency: currency.label,
            selectedCurrencySymbol: currency.symbol,
          });
        }
      })
      .catch((error) => this.setState({ error: error.message }));
  }

  setLocalStorage = (currency) => {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        label: currency.label,
        symbol: currency.symbol,
      })
    );
  };
  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("currency"));
  };

  onSelectCurrency = (currency) => {
    this.setLocalStorage(currency);
    this.setState({ selectedCurrency: currency.label, selectedCurrencySymbol: currency.symbol });
  };
  render() {
    const { children } = this.props;

    const onChange = this.onSelectCurrency;
    const { selectedCurrency,selectedCurrencySymbol } = this.state;

    return (
      <CurrencyContext.Provider value={{ selectedCurrency,selectedCurrencySymbol, onChange }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
