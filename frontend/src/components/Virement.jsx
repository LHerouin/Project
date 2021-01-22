import React, { Component } from 'react';
import '../css/Project.css';


class Virement extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
        Montant:0,
        Destinataire:"",
        value_res:"",
        selectDevise:"eth"
      
    }
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChange2(e) {
    this.setState({ selectDevise: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    if(this.state.Destinataire.localeCompare("")===0){
        this.setState({value_res:"Merci de remplir le champ destinataire"});
    }
    else if(this.state.Change.localeCompare("")===0){
        this.setState({value_res:"Merci de remplir le champ montant"});
    }
    else{
        e.preventDefault();
        if(this.state.Montant===0){
            this.setState({value_res:"Merci de remplir le champ de montant"});
        }
        else{
            if(this.state.selectDevise.localeCompare("eth")==0){
            this.setState({value_res:""});
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.Project;
            const stackId = contract.methods["VirementETH"].cacheSend(this.state.Destinataire,this.state.Change*1000000000000000000);
            }
            else{
            this.setState({value_res:""});
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.Project;
            const stackId2 = contract.methods["VirementPT"].cacheSend(this.state.Destinataire,this.state.Change/1.5);
            }
        

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
                  type="text"
                  name="Destinataire"
                  placeholder="Destinataire"
                  value={this.state.Destinataire}
                  onChange={this.onChange}
                />
                 <br/>
                <input
                  id="form_profile_mdp22"
                  type="number"
                  step="0.01"
                  name="Montant"
                  placeholder="Montant"
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
                <button id="form_button3" type="submit">Valider</button>
                <p>{this.state.value_res.toString()}</p>
              </form>
        </div>
      );
  }
}
export default Virement;