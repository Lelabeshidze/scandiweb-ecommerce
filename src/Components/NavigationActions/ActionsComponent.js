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
      show: false,
    };
  }
  onSelectChange = (currency) => {
    this.context.onChange(currency);
    this.clickHandler()

  };
  // onSelect = (currency) => {
  //   this.context.OnselectCurrency(currency);
  // };
  clickHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    const { data } = this.props;
    const { show } = this.state;

    const { cartItems, totalAmount } = this.props.cartItems;
    const { selectedCurrency } = this.context;
    console.log(selectedCurrency)
    if (data) {
      return (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          alignItems: "center"

        }}>

          <div onClick={this.clickHandler} style={{ position: "relative", paddingRight: "20px" }}>
            <span style={{
              margin: " 28px 16px",
              fontSize: "18px",
              color: "#1d1f22",
              cursor: "pointer",
              fontWeight: "900"
            }}>
              {selectedCurrency}
            </span>
            {
              show &&
              <CurrenciesContainer>
                <ul name="currency" >
                  {data?.currencies?.map((currency, index) => {
                    return (
                      <li key={index} onClick={() => this.onSelectChange(currency)} className="LastCHild">
                        <span>{currency.symbol}</span>
                        <span>{currency.label}</span>
                      </li>
                    );
                  })}
                </ul>

              </CurrenciesContainer>
            }
          </div>



          <CartOverlayPage />
        </div>
      );
    }
  }
}

const CurrenciesContainer = styled.div`

ul{
  position: absolute;
  padding: 20px;
  top: 30px;
  width: 114px;
  font-size: 18px;
  background-color: #fff;
  animation: showCurrencies 0.45s 1;
  box-shadow: 0px 4px 15px rgb(168 172 176 / 45%);
  font-weight: 900;
  z-index: 1;
}
          li{
            cursor: pointer;
            font-weight: 900;
            display:flex;
            justify-content:space-evenly;
           
  }
          li:hover {
            color: #5ece7b;
  }

  li:not(:last-child){
            padding-bottom: 21px;
  }
         @keyframes showCurrencies {
            0 % {
              top: 50px;
              opacity: 0;
            }
    100% {
            top: 30px;
    }
  }

          `;

export default getData(ActionsComponent, GET_CURRENCIES);
