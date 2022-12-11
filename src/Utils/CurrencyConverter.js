import React, { Component, createContext } from "react";

const CurrencyContext = createContext();
class CurrencyProvider extends Component {
  render() {
    return (
      <CurrencyContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyProvider;
