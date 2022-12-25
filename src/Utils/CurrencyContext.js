import React, { Component, createContext } from "react";


const CurrencyContext = createContext(true);
export class CurrencyProvider extends Component {
  state = {
    selectCurrency: false,
  };

  onSelectChange = (event) => {
    this.setState({ selectCurrency: event.target.value });
  };

  render() {
    const { children } = this.props;

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
