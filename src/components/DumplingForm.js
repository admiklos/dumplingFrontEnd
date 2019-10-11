import React from 'react';
import { Link } from "react-router-dom";

//   wrapperType:  WONTON,    DROP_BATTER,    FRITTER,    NON_GLUTEN,    POTSTICKER,    BREAD_DOUGH
//   cookMethod:   PAN_FRY,     STEAM,    BOIL,    DEEP_FRY,    STEAM_FRY


class DumplingForm extends React.Component {
  constructor() {
    super()
    this.state={
      id:0,
      wrapperType:"",
      cookMethod:"",
      contents:"",
      amountInOrder:0
    }
  }

  onIdInput=(event)=>{
    this.setState({id: event.target.value});
  }

  onWrapperInput=(event)=>{
    this.setState({wrapperType: event.target.value});
      console.log(event.target.value);
  }

  onCookMethodInput=(event)=>{
    this.setState({cookMethod: event.target.value});
      console.log(event.target.value);
  }

  onContentsInput=(event)=>{
    this.setState({contents: event.target.value});
      console.log(event.target.value);
  }

  onOrderSizeInput=(event)=>{
    this.setState({amountInOrder: event.target.value});
      console.log(event.target.value);
  }

  handleCreateClick=(event)=>{
    fetch('http://localhost:8080/dumpling', {
      method: 'post',
      body: JSON.stringify({
        wrapperType   : this.state.wrapperType,
        cookMethod    : this.state.cookMethod,
        contents      : this.state.contents,
        amountInOrder : this.state.amountInOrder
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    }).then( () => {
      this.props.getDataFromAPI();
      this.setState({wrapperType:"", cookMethod:"", contents: "", amountInOrder:0});
    })
  }

  handleUpdateClick=(id)=>{
    fetch('http://localhost:8080/dumpling/' + id, {
      method: 'put',
      body: JSON.stringify({
        wrapperType   : this.state.wrapperType,
        cookMethod    : this.state.cookMethod,
        contents      : this.state.contents,
        amountInOrder : this.state.amountInOrder
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    }).then( () => {
      this.props.getDataFromAPI();
      this.setState({wrapperType:"", cookMethod:"", contents: "", amountInOrder:0, id:0});
    })
  }

  componentDidMount() {
    let id  = this.props.match ? this.props.match.params.id : 0;
    this.setState({ id : id });
  }

  render(){
    let buttonAction;
    if ( this.state.id ) {
       buttonAction = <button onClick={()=>this.handleUpdateClick(this.state.id)}>Update Order</button>
    } else {
       buttonAction = <button onClick={this.handleCreateClick}>Create Order</button>     
    }
    return (
      <div>
        <input type="text" defaultValue={this.state.wrapperType} onInput={this.onWrapperInput} placeholder="Wrapper Type"/>
        <input type="text" defaultValue={this.state.cookMethod} onInput={this.onCookMethodInput} placeholder="Cook Method"/>
        <input type="text" defaultValue={this.state.contents} onInput={this.onContentsInput} placeholder="Contents"/>
        <input type="number" defaultValue={this.state.amountInOrder} onInput={this.onOrderSizeInput} placeholder="Amount in Order"/>
        <Link to="/">{ buttonAction }</Link> 
      </div>
    )
  }
}

export default  DumplingForm ;