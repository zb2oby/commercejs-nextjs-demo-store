import React, { Component } from "react";
import { connect } from "react-redux";

import commerce from '../../lib/commerce';

class CartItem extends Component {

  /**
  * Update cart item
  */
  async updateCartItem(e, id, quantity) {
    e.preventDefault();
    const { data: cart } = await commerce.cart.update(id, { quantity: quantity })

    this.props.dispatch({ type: 'UPDATE_CART_ITEM', payload: cart });
  }

  /**
  * Remove item from cart
  */
 async removeFromCart(e, item) {
  e.preventDefault();
  const { data: cart } = await commerce.cart.remove(item)

  this.props.dispatch({ type: 'REMOVE_FROM_CART', payload: cart });
}

  render() {
    const { item } = this.props;

    return (
      <div className="px-4 px-md-5 py-4">
        <div className="cart-item d-flex">
          <div
            className="cart-item--image mr-4"
            style={{ backgroundImage: `url("${item.media.source}")` }}
          ></div>
          <div className="flex-grow-1 borderbottom border-color-gray400 h-100">
            <div className="d-flex justify-content-between mb-2">
              <p>{item.name}</p>
              <p className="text-right font-weight-medium">
                ${item.line_total.formatted_with_symbol}
              </p>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="font-color-light font-weight-small">
                {item.variants[0].variant_name}: {item.variants[0].option_name}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between pt-2 pb-4">
              <div className="d-flex align-items-center">
                <button className="p-0 bg-transparent" onClick={(e) => item.quantity > 1 ? this.updateCartItem(e, item.id, item.quantity -1) : this.removeFromCart(e, item.id)}>
                  <img src="/icon/minus.svg" className="w-16" />
                </button>
                <p className="text-center px-3">{item.quantity}</p>
                <button className="p-0 bg-transparent" onClick={(e) => this.updateCartItem(e, item.id, item.quantity + 1)} >
                  <img src="/icon/plus.svg" className="w-16" />
                </button>
              </div>
              <p className="text-right text-decoration-underline font-color-medium cursor-pointer" onClick={(e) => this.removeFromCart(e, item.id)}>
                Remove
              </p>
            </div>
          </div>
        </div>
    </div>
  )
  }
}

export default connect(state => state)(CartItem);
