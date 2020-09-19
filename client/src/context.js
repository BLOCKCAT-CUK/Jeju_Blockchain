import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
//import getWeb3 from "./utils/getWeb3";
import IndianContract from "./contracts/Indian.json";
import Caver from "caver-js";
import axios from "axios";
const ProductContext = React.createContext();

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651/'
}

const cav = new Caver(config.rpcURL);

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
    toaccount: null,
    myGame: 0,
    cav: null,
    contract: null
  };
  componentDidMount = async () => {
    this.setProducts();
    this.getAllAccounts();
    console.log(this.state);
    try {
      console.log(cav);
      const privateKey = '0xb3d98ee179ab3d115f24ad25b8237bfe616c3306b53029272bd410e4eac23c40';
      const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
      const accounts = await cav.klay.accounts.wallet.add(walletInstance);
      const networkId = await cav.klay.net.getId();
      const deployedNetwork = IndianContract.networks[networkId];
      const instance = new cav.klay.Contract(
        IndianContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ cav, accounts: accounts.address, contract: instance });
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

  getAllAccounts = async () => {
    let toaccount = null;
    const option = {
      method: 'GET',
      url: 'http://localhost:5000/',
      headers: {
        'x-chain-id': '1001',
        'Authorization': 'Basic S0FTS1E3TEhWSjQ1SDlNQzQ0MzJPRE41OlNwV1hDdllwck83VjI2MFNHMUlLMFVBMkFjY2FVMDNEVGhSWW0rU3Y='
      }
    }
    var self = this;
    axios(option)
      .then(async function (response) {
        //console.log(JSON.stringify(response.data.items[0]));
        const account = await response.data.items[0].address;
        console.log(account);
        self.setState({ toaccount: account })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
        //(this.state);
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
  buyGame = async () => {
    if (!this.state.contract) {
      alert('No Wallet Address!');
    }
    console.log(this.state.accounts);
    const amount = this.state.cav.utils.toPeb(this.state.cartTotal.toString(), 'KLAY');
    const vt = new this.state.cav.transaction.valueTransfer({
      from: this.state.accounts,
      to: this.state.toaccount,
      value: amount,
      gas: 90000,
      nonce: this.state.cav.rpc.klay.getTransactionCount(this.state.accounts, 'pending')
    })
    console.log(vt);
    const sendTestKlayRecipt = await this.state.cav.rpc.klay.sendTransaction(vt);
    console.log(sendTestKlayRecipt);
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
