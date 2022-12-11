import React, { Component } from "react";
import { GET_CURRENCIES } from "../../GraphQL/dataQueries";
import { getData } from "../../GraphQL/getData";
import Cart from "../../Assets/cart.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
class CurrenciesComponent extends Component {
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
        <Link to="/cart">
          <img src={Cart} alt="logo" />
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

export default getData(CurrenciesComponent, GET_CURRENCIES);
