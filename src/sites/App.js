import React, {Component} from 'react'

import Title from '../bricks/Title'
import List from '../bricks/List/List'

import './App.css'

export default class App extends Component{
  constructor(props){
    super(props)

    let items

    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', 'Marius')
    }

    if (!localStorage.getItem('desc')) {
      localStorage.setItem('desc', '1st React App')
    }

    try{
      items = JSON.parse(localStorage.getItem('items'))
    }
    catch(e){
      localStorage.removeItem('items')
    }

    if (!items) {
      items = []
      localStorage.setItem('items', JSON.stringify([]))
    }

    this.state = {
      user: localStorage.getItem('user'),
      desc: localStorage.getItem('desc'),
      count: items.length,
      items: items,
    }

    this.onListUpdate = this.onListUpdate.bind(this)
  }

  onListUpdate(items){
    localStorage.setItem('items', JSON.stringify(items))
    this.setState({
      count: items.length
    })
  }

  render() {
    return (
      <div className="App">
        <Title
          name = {this.state.user}
          desc = {this.state.desc}
          count = {this.state.count} />
        <List
          header = {`You have ${this.state.items.length} tasks to go`}
          items = {this.state.items}
          onUpdate = {this.onListUpdate}/>
      </div>
    )
  }
}
