import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../components/App';
import { connect } from "react-redux";

import { Drizzle } from "@drizzle/store";
import MyStringStore from "../contracts/Project.json";

const options = {
    contracts: [MyStringStore],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:8545",
        },
    },
};

const drizzle = new Drizzle(options);

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={(props) => <App drizzle={drizzle} {...props} /> } />
        </div>
      </BrowserRouter>
       
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Router);