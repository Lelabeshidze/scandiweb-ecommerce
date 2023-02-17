import React, { Component } from 'react';
import ClothesComponent from '../Components/CategoryComponent/ClothesComponent';
import CartContext from '../Utils/CartContext';

class ClothesPage extends Component {
    render() {
        return (
            <div>
                <CartContext.Consumer>{(cartItems) => (<ClothesComponent cartItems={cartItems} />)}</CartContext.Consumer>

            </div>
        );
    }
}

export default ClothesPage;
