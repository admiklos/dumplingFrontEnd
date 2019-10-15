import React from 'react';
import { Link } from "react-router-dom";

class ShowOrder extends React.Component {
  constructor() {
    super();
    this.state={
      order:{}
    }
  }

  getOrder = (id) => {
    fetch('https://dumplings.cfapps.io/dumpling/' + id )
      .then( (res) => res.json() )
      .then((response)=> {
        console.log(response);
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch('https://dumplings.cfapps.io/dumpling/' + id )
      .then( (res) => res.json() )
      .then((order)=> {
        console.log(order);
        this.setState({ order : order });
    });
  }

  handleDeleteOneClick = (id) => {
    fetch('https://dumplings.cfapps.io/dumpling/' + id, {
      method: 'delete',
    }).then( () => {
      this.props.getDataFromAPI();
    })
  }


//   id, wrapperType, cookMethod, contents, amountInOrder
//   wrapperType:  WONTON,    DROP_BATTER,    FRITTER,    NON_GLUTEN,    POTSTICKER,    BREAD_DOUGH
//   cookMethod:   PAN_FRY,     STEAM,    BOIL,    DEEP_FRY,    STEAM_FRY
// style="overflow-x:auto;"

  render(){
    return (
      <div>
        <div >
          <table>
          <tr>
            <th>ID</th>
            <th>WRAPPER</th>
            <th>COOK</th>
            <th>CONTENTS</th>
            <th>COUNT</th>
          </tr>
          <tr>
            <td>{this.state.order.id}</td>
            <td>{this.state.order.wrapperType}</td>
            <td>{this.state.order.cookMethod}</td>
            <td>{this.state.order.contents}</td>
            <td>{this.state.order.amountInOrder}</td>
            <td><Link to="/"><button onClick={()=>this.handleDeleteOneClick(this.state.order.id)}>Delete Order</button></Link></td>
            <td><Link to={{pathname:"/edit/dumpling/" + this.state.order.id, state:this.state.order}}><button>Update Order</button></Link></td>
          </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default ShowOrder;
