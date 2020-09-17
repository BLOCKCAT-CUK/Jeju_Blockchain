import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default class CartTotals extends Component {

  render() {
    const {
      cartTotal,
      cart,
      clearCart,
      buyGame,
      //investGame,
    } = this.props.value;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong> {cartTotal}ETH </strong>
                </h5>
                <Link to="/game">
                  <Button 
                    className="btn text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      buyGame();
                      }}
                      >
                    Buy Game
                    </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}


const Button = styled.button`
text-transform: capitalize;
font-size: 1.1rem;
background: transparent;
border: 0.1rem solid Black;
border-color: ${props =>
  props.cart ? "var(--mainYellow)" : "Black"};
color: var(--mainWhite);
color: ${props => (props.cart ? "var(--mainYellow)" : "Black")};
border-radius: 0.3rem;
padding: 0.2rem 0.5rem;
outline-color: Black;
cursor: pointer;
display: inline-block;
margin: 0 0 0 0;
transition: all 0.5s ease-in-out;
&:hover {
  background: var(--mainBlue);
  background: ${props =>
    props.cart ? "var(--mainYellow)" : "Black"};
  color: var(--mainWhite);
}
&:focus {
  outline: none;
}
`;