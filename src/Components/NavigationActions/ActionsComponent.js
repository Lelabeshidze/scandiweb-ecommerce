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
      currentCurrency: this.context?.selectedCurrency,
    };
  }
  onSelectChange = (currency) => {
    this.context.onChange(currency);

  };
  // onSelect = (currency) => {
  //   this.context.OnselectCurrency(currency);
  // };
  render() {
    const { data } = this.props;

    const { cartItems, totalAmount } = this.props.cartItems;

    if (data) {
      return (
        <CurrenciesContainer>
          <ul name="currency" >
            {data?.currencies?.map((currency, index) => {
              return (
                <li key={index} onClick={() => this.onSelectChange(currency)}>
                  {currency.symbol}
                </li>
              );
            })}
          </ul>
          <CartOverlayPage />
        </CurrenciesContainer>
      );
    }
  }
}
const CurrenciesContainer = styled.div`
  display: flex;
  
 
 
 ul{
  width: 114px;
  font-size: 18px;
  background-color: #fff;
  animation: showCurrencies 0.45s 1;
  border:none;
  cursor:pointer;


 }
  li{
    cursor: pointer;
 
  }
  li:hover {
    color: #5ece7b;
  }
  li:not(:last-child) {
    padding-bottom: 21px;
  }

  @keyframes showCurrencies {
    0% {
      top: 50px;
      opacity: 0;
    }
    100% {
      top: 30px;
    }
  }
 
`;

export default getData(ActionsComponent, GET_CURRENCIES);
