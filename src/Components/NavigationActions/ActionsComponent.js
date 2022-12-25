import React, { Component } from "react";
import { GET_CURRENCIES } from "../../GraphQL/dataQueries";
import { getData } from "../../GraphQL/getData";
import styled from "styled-components";
import CurrencyContext from "../../Utils/CurrencyContext";
import CartOverlayPage from "../../Pages/CartOverlayPage";
class ActionsComponent extends Component {
  static contextType = CurrencyContext;
  constructor() {
    super();
    this.state = {
      currentCurrency: this.context?.selectCurrency,
    };
  }
  onSelectChange = (event) => {
    this.context.onChange(event);
  };
  onSelect = (currency) => {
    this.context.OnselectCurrency(currency);
  };
  render() {
    const { data } = this.props;

    const { cartItems, totalAmount } = this.props.cartItems;

    return (
      <CurrenciesContainer className="actions">
        <select name="currency" onChange={this.onSelectChange.bind(this)}>
          {data?.currencies?.map((currency, index) => {
            return (
              <option key={index} value={currency.label}>
                {currency.label}
                {currency.symbol}
              </option>
            );
          })}
        </select>
        <CartOverlayPage />
      </CurrenciesContainer>
    );
  }
}
const CurrenciesContainer = styled.div`
  .actions {
    display: flex;
  }
`;

export default getData(ActionsComponent, GET_CURRENCIES);
