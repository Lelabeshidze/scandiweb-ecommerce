import React, { Component } from 'react';
import TechComponent from '../Components/CategoryComponent/TechComponent';
import CartContext from '../Utils/CartContext';

class TechPage extends Component {
    render() {
        return (
            <div>
                <CartContext.Consumer>{(cartItems) => (<TechComponent cartItems={cartItems} />)}</CartContext.Consumer>

            </div>
        );
    }
}

export default TechPage;
