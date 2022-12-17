import React, { Component } from "react";
import { GET_CURRENCIES } from "../../GraphQL/dataQueries";
import { getData } from "../../GraphQL/getData";
import Cart from "../../Assets/cart.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CurrencyContext from "../../Utils/CurrencyContext";
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
              <option
                key={index}
                value={currency.label}
                onClick={this.onSelect(this.state.currentCurrency)}
              >
                {currency.label}
                {currency.symbol}
              </option>
            );
          })}
        </select>

        <img src={Cart} alt="logo" />
        <span>{totalAmount}</span>
        <Link to="/cart">
          <button>View Bag</button>
        </Link>
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
