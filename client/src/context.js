import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
//import getWeb3 from "./utils/getWeb3";
import IndianContract from "./contracts/Indian.json";
import Caver from "caver-js";
const ProductContext = React.createContext();

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}

//const cav = new Caver(config.rpcURL);
//const Indian = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTotal: 0,
    accounts: null,
    myGame: 0,
    cav: null,
    contract: null
  };
  componentDidMount = async () => {
    this.setProducts();
    try {
      const cav = await new Caver(config.rpcURL);
      console.log(cav);
      //const accounts = await web3.eth.getAccounts();
      const privateKey = '';
      const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
      const accounts = await cav.klay.accounts.wallet.add(walletInstance);
      //console.log(accounts);
      //const accounts = await cav.klay.accounts.wallet && cav.klay.accounts.wallet[0];
      const networkId = await cav.klay.net.getId();
      //console.log(networkId);
      const deployedNetwork = IndianContract.networks[networkId];
      const instance = new cav.klay.Contract(
        IndianContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      this.setState({ cav, accounts: accounts.address, contract: instance });
      //this.updateMyGames();
      console.log(this.state);
    } catch (error) {
      alert(
        `Failed to load Caver, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product },
        accounts: this.state.accounts,
        cav: this.state.cav,
        contract: this.state.contract

      };
    }, this.addTotals);
    console.log(this.state.products);
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  getTotals = () => {
    // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const total = subTotal;
    return {
      subTotal,
      total
    }
  };
  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTotal: totals.total
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  buyGame = () => {
    if (!this.state.contract) {
      alert('No Wallet Address!');
    }
    console.log(this.state.accounts);
    this.state.contract.methods.buyGame().send({
      from: this.state.accounts,
      value: this.state.cav.utils.toWei(this.state.cartTotal.toString(), 'ether'),
      gas: 900000
    });
  };
  investGame = () => {
    if (!this.state.contract) {
      alert('No Wallet Address!');
    }
    this.state.contract.methods.investGame().send({
      from: this.state.accounts,
      value: this.state.cav.utils.toWei('5', 'ether'),
      gas: 900000
    });
  }
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          buyGame: this.buyGame,
          investGame: this.investGame
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
