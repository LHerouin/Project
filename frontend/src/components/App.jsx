import '../css/App.css';
import React, { Component } from 'react';
import load from '../img/load.gif';
import Home from './Home.jsx';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      Page:[],
      loading: true,
      drizzleState: null
    }
  }
  componentDidMount(){
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
        var Page =[];
        Page.push(<Home appContext={this} key={"home"} drizzle={this.props.drizzle} drizzleState={drizzleState}/>);
        this.setState({
          Page:Page
        })
      }
    });

    
    
  }

  render() {
    if (this.state.loading) return <img id="loading" src={load} alt="GIF de chargement"></img>;
    return (
      <div className="App" >
        {this.state.Page}
      </div>
    );
  }
}

export default App;