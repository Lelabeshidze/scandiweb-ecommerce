import React, { Component, createContext } from "react";

const CurrencyContext = createContext(true);
export class CurrencyProvider extends Component {
  state = {
    selectedCurrency: null,
    selectedCurrencySymbol: null,
  };

  // onSelectChange = (event) => {
  //   this.setState({ selectCurrency: event.target.value });
  // };
  componentDidMount() {

    const currency = this.getLocalStorage();
    this.setState({
      selectedCurrency: currency.label,
      selectedCurrencySymbol: currency.symbol,
    });

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
    const { selectedCurrency } = this.state;

    return (
      <CurrencyContext.Provider value={{ selectedCurrency, onChange }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
