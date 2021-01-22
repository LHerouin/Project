import React, { Component } from 'react';
import '../css/Project.css';
import { connect } from "react-redux";
import { changePage} from "../actions/index.jsx";
import { withRouter } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Xchange from './Xchange.jsx';
import Virement from './Virement.jsx';

function mapDispatchToProps(dispatch) {
  return {
    changePage: page => dispatch(changePage(page))
  };
}

const mapStateToProps = state => {
  return { page: state.page };
};

class Home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
    }
    this.handleAcc = this.handleAcc.bind(this);
    this.handleXchange = this.handleXchange.bind(this);
    this.handleVirement = this.handleVirement.bind(this);
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Project;
    const dataKey = contract.methods["getBalance"].cacheCall(this.props.drizzleState.accounts[0]);
    this.setState({ dataKey });
  }


  handleAcc(e) {
    this.props.changePage( <Img/> );
  }

  handleXchange(e) {
    this.props.changePage( <Xchange drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/> );
  }

  handleVirement(e) {
    this.props.changePage( <Virement drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/> );
  }

  render() {

    const { Project } = this.props.drizzleState.contracts;
    const balance = Project.getBalance[this.state.dataKey];


    return (
        <div id="page_connexion">
          {this.props.page}
        <div id="connexion">
          <div id="formulaire">
            <p>Balance : {balance && balance.value}</p>
            <button id="form_button"  onClick={(event) => this.handleAcc()}>Retour accueil</button> <br/>
            <button id="form_button"  onClick={(event) => this.handleXchange()}>Xchange</button> <br/>
            <button id="form_button"  onClick={(event) => this.handleVirement()}>Virement</button> <br/>
            </div>
          </div>
        </div>
      );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));