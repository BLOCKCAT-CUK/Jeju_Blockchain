import React, { Component } from "react";
import Title from "../Title";
import GameColumns from "./GameColumns";
import GameList from "./GameList";
import { ProductConsumer } from "../../context";
import EmptyGame from "./Emptygame";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            //console.log(cart);
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="game" />
                  <GameColumns />
                  <GameList value = {value}/>
                </React.Fragment>
              );
            } else {
              return <EmptyGame />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
