import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    id: 0,
    content: 'not a task',
    done: false
  }

  increment = ()=>{
    this.setState({
      count: this.state.count + 1
    })
  }

  updateState = ()=> {
    
  }

  render() {
    return (
      <>
      <span>{this.state.content}</span>
      <input type="checkbox" checked={this.state.done} onClick={this.updateState}></input>
      </>
    )
  }
} 


export default App