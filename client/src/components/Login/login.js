import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Register from "./Register"
import "./Login.css"
import styled from "styled-components";
//const axios = require('axios');

export default class Login extends Component {
  render() {
    return (
      <div className="centered" style={{}}>
        <form className="logina" onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>
          <Link to="/">
            <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
          </Link>
        </form>
      </div>
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