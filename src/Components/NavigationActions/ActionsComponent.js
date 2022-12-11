import React, { Component } from "react";
import { GET_CURRENCIES } from "../../GraphQL/dataQueries";
import { getData } from "../../GraphQL/getData";
import Cart from "../../Assets/cart.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
class ActionsComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentCurrency: false,
    };
  }
  onSelectChange = (event) => {
    this.setState({ currentCurrency: event.target.value });
  };

  render() {
    const { data } = this.props;

    const { cartItems, totalAmount } = this.props.cartItems;

    console.log(totalAmount);
    return (
      <CurrenciesContainer className="actions">
        <select
          name="currency"
          value={this.state.currentCurrency}
          onChange={this.onSelectChange.bind(this)}
        >
          {data?.currencies?.map((currency, index) => {
            return <option key={index}>{currency.symbol}</option>;
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
