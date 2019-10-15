import React from 'react';
import { Link } from "react-router-dom";


class ShowOrders extends React.Component{

  handleDeleteAllClick = () => {
    fetch('https://dumplings.cfapps.io/dumplings/', {
      method: 'delete',
    }).then( () => {
      this.props.getDataFromAPI();
    })
  }

  render(){
    let myDumplings = this.props.dumplings.map((dumpling) => {
          return (
            <Link to={"/dumpling/" + dumpling.id} key={dumpling.id}>
              <tr>
                  <td>{dumpling.id}</td>
                  <td>{dumpling.wrapperType}</td>
                  <td>{dumpling.cookMethod}</td>
                  <td>{dumpling.contents}</td>
                  <td>{dumpling.amountInOrder}</td>
              </tr>
            </Link>
       )
    })
    return (
      <div>
        <table>
          <tr>{myDumplings}</tr>
        </table>
      </div>
    );
  }
}


export default ShowOrders;