import React, {Component} from 'react'

import './ListItem.css'
import './ListItemNew.css'

export default class ListItemNew extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit({
      id: this.genNewId(),
      text: this.state.text
    })
    this.setState({
      text: ''
    })
  }

  genNewId() {
    return Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
  }

  render(){return(
    <form
      className = 'ListItemNew'
      onSubmit = {this.onSubmit}>
      <input
        type = 'text'
        name = 'text'
        placeholder = 'type new item'
        value = {this.state.text}
        onChange = {this.onChange} />
      <input
        type = 'submit'
        value = '&#x2714;' />
    </form>
  )}
}