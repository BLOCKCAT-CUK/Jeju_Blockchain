import React, { Component } from "react";

export default class GameItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      icon: null,
    }
  }
  componentDidMount(){// Practicing this setState
    setTimeout(() => {
      this.setState({
        icon: "fas fa-download",
      })
    }, 3500)
  }
  render() {
    const { id, title, img, price } = this.props.item;
    const { removeItem } = this.props.value;
    return (
      <div className="row my-1 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
          <img
            src={img}
            style={{ width: "5rem", heigth: "5rem" }}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <span className="d-lg-none">product :</span> {title}
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <strong>
            <span className="d-lg-none">price :</span> {price} ETH
          </strong>
        </div>
        
        <div className="col-10 mx-auto col-lg-2 ">
          <div onClick={() => removeItem(id)}>
            <i className={this.state.icon}></i>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <div className=" cart-icon" onClick={() => removeItem(id)}>
          <i className="far fa-tired"></i>
          </div>
        </div>
      </div>
    );
  }
}
