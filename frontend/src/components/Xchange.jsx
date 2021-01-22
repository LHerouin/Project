import React, { Component } from 'react';
import '../css/Project.css';


class Xchange extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
        Change:0,
        value_res:"",
        selectDevise:"eth",
        valueXchange:" => 0"
      
    }
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(this.state.selectDevise.localeCompare("eth")==0){
      this.setState({valueXchange:" => "+e.target.value*2})
    }
    else{
      this.setState({valueXchange:" => "+e.target.value/1.5})
    }
  }

  onChange2(e) {
    this.setState({ selectDevise: e.target.value });
    if(e.target.value.localeCompare("eth")==0){
      this.setState({valueXchange:" => "+this.state.Change*2})
    }
    else{
      this.setState({valueXchange:" => "+this.state.Change/1.5})
    }
  }


  onSubmit(e) {
    e.preventDefault();
    if(this.state.Change===0){
        this.setState({value_res:"Merci de remplir le champ de change"});
    }
    else{
        if(this.state.selectDevise.localeCompare("eth")==0){
          this.setState({value_res:""});
          const { drizzle, drizzleState } = this.props;
          const contract = drizzle.contracts.Project;
          const stackId = contract.methods["ETHtoPT"].cacheSend(this.state.Change*1000000000000000000);
        }
        else{
          this.setState({value_res:""});
          const { drizzle, drizzleState } = this.props;
          const contract = drizzle.contracts.Project;
          const stackId = contract.methods["PTtoETH"].cacheSend(this.state.Change);
          const stackId2 = contract.methods["VirementETH"].cacheSend(this.props.drizzleState.accounts[0],this.state.Change/1.5);
        }
       

    }
    
  }

  updateState() {
    this.setState({ error_msg: true });
  }
  render() {
    return (
        <div id="design2">
        <form className="form_profile" id="profile2" onSubmit={this.onSubmit}>
                 <br/>
                <input
                  id="form_profile_mdp22"
                  type="number"
                  step="0.01"
                  name="Change"
                  placeholder="Change"
                  value={this.state.Change}
                  onChange={this.onChange}
                />
                <br/>
                <select value={this.state.selectDevise}  onChange={this.onChange2}  className="bool-select">
                    <option value="eth">ETH</option>
                    <option value="pt">PT</option>
                </select>
                <p>{this.state.valueXchange}</p>
                <br/>
                <button id="form_button3" type="submit">Xchange</button>
                <p>{this.state.value_res.toString()}</p>
              </form>
        </div>
      );
  }
}
export default Xchange;