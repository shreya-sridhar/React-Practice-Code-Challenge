import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
      sushis:[],
      budget: 50,
      startIndex:0
  }

  isSushiEaten = (sushi) => {
    if (!('eaten' in sushi))
    {
      return false
    }
    return true
  }

  getMoreSushi = () => {
    let newIndex = this.state.startIndex + 4
    this.setState(
      {
      startIndex: newIndex
    })
  }


  eatSushi = (sushi) =>{
  //  eat sushi only when budget permits and sushi is not eaten
    if ((this.isSushiEaten(sushi) === false) && (this.state.budget - sushi["price"]>=0))
    {
      let sushiEaten = {...sushi, eaten : true}
      //find sushi by id and overwrite sushi in state
      let sushi_id = sushi["id"]
      let sushis_left = this.state.sushis.filter(sushi => {
        let remaining_sushis = (sushi["id"] != sushi_id)
        return remaining_sushis})
      let final_sushis = [...sushis_left.concat(sushiEaten)]
      final_sushis.sort(function(a, b) {
        var keyA = (a.id),
          keyB = (b.id);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      let final_budget = this.state.budget - sushi["price"]  
      this.setState({
        sushis:final_sushis,
        budget:final_budget
        })
      
    }
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({sushis:data}))
  }

  render() {
    return (
      <div>
        <div>
            <SushiContainer sushis = {this.state.sushis} budget = {this.state.budget} isSushiEaten = {this.isSushiEaten} eatSushi = {this.eatSushi}  startIndex = {this.state.startIndex} getMoreSushi = {this.getMoreSushi} />
        </div>
        <div className="app">
          <Table budget = {this.state.budget} sushis = {this.state.sushis.filter(sushi => {let sushis_eaten = (sushi.eaten === true)
          return sushis_eaten})}/>
        </div>
      </div>
    );
  }
}

export default App;

// SushiWallet! Add a form for customers to add more money to their balance

// Full rotation! When the end of the line of sushi is reached, the conveyor belt should start from the beginning. Sushi that have already been eaten should remain eaten. It would be creepy if they reappeared!

