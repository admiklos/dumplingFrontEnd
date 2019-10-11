import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DumplingForm from './components/DumplingForm';
import ShowOrder from './components/ShowOrder';
import ShowOrders from './components/ShowOrders';
import './App.css';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
       dumplings:[]
    }
  }

  getDataFromAPI = () => {
    fetch("http://localhost:8080/dumplings")
      .then( (res) => res.json() )
      .then((response)=> {
        this.setState({dumplings:response});
        console.log(response);
    });
  }

  componentDidMount(){
    this.getDataFromAPI();
  }


render() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link id="show_orders" to="/">Home</Link>
            </li>
            <li>
              <Link id="create_order" to="/create">New Order</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div id="content_body">
        <Switch>
          <Route path="/dumpling/:id" render={(props)=>(
            <ShowOrder {...props} getDataFromAPI={this.getDataFromAPI} />
          )}/>
          <Route path="/edit/dumpling/:id" render={(props)=>(
            <DumplingForm {...props} getDataFromAPI={this.getDataFromAPI} />
          )}/>
          <Route path="/create">
            <DumplingForm getDataFromAPI={this.getDataFromAPI}/>
          </Route>
          <Route exact path="/">
            <ShowOrders getDataFromAPI={this.getDataFromAPI} dumplings={this.state.dumplings}/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
 }
}

export default App;
