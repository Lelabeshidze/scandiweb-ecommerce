import React, { Component, createContext } from "react";

const CartContext = createContext(true);
export class CartProvider extends Component {
  cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  state = {
    cartItems: this.cart,
    totalAmount: 0,
    setAttribute: {},
    selected: false,
    attributesId: "",
  };

  componentDidMount() {
    const totalAmount = this.calculateTotalAmount(this.cart);
    this.setState({ totalAmount: totalAmount });
  }
  handleAttribute = (attributeName, attributeObj) => {
    const selectedAttributeObj = { [attributeName]: attributeObj };
    const setAttribute = {
      ...this.state.setAttribute,
      ...selectedAttributeObj,
    };
    let attributesId = "";
    for (const key in setAttribute) {
      attributesId = attributesId + setAttribute[key].displayValue;
    }
    this.setState({
      attributesId,
      setAttribute,

    });
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
  };
  // addToCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();

  //   let alreadyInCart = false;
  //   cartItems.forEach((item) => {
  //     if (item.id === product.id) {
  //       item.count++;
  //       alreadyInCart = true;
  //     }
  //   });

  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 });
  //   }

  //   this.setState({ cartItems});
  //   localStorage.setItem("cart", JSON.stringify(cartItems));

  //   const totalAmount = this.calculateTotalAmount(cartItems);
  //   this.setState({ totalAmount: totalAmount });
  //   console.log(product)
  // };
  addToCart = (productObj) => {
    const existingProductIndex = this.state.cartItems.findIndex(
      (product) =>
        product.id === productObj.id &&
        product.selectedAttributeId === productObj.selectedAttributeId
    );
    const existingProduct = this.state.cartItems[existingProductIndex];
    let updatedCart;

    if (existingProduct) {
      existingProduct.count++;
      updatedCart = this.state.cartItems;
      this.setState({ cartItems: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      updatedCart = [...this.state.cartItems, { ...productObj, count: 1 }];
      this.setState({ cartItems: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const totalAmount = this.calculateTotalAmount(updatedCart);
    this.setState({ totalAmount: totalAmount });
    this.setState({ setAttribute: {} })
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    cartItems.forEach((item) => {
      if (
        item.id === product.id &&
        item.selectedAttributeId === product.selectedAttributeId
      ) {
        item.count--;
      }
    });

    this.setState({ cartItems });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const totalAmount = this.calculateTotalAmount(cartItems);
    this.setState({ totalAmount: totalAmount });
  };
  calculateTotalAmount = (updatedCart) => {
    let totalAmount = 0;
    updatedCart.forEach((product) => {
      totalAmount += product.count;
    });
    return totalAmount;
  };

  render() {
    const { children } = this.props;
    const { cartItems, totalAmount, setAttribute, attributesId, selected } = this.state;
    const changeAttribute = this.handleAttribute;
    const addToCart = this.addToCart;
    const removeFromCart = this.removeFromCart;
    return (
      <CartContext.Provider
        value={{
          addToCart,
          cartItems,
          totalAmount,
          removeFromCart,
          changeAttribute,
          setAttribute,
          attributesId,
          selected
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
