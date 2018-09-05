import React, {Component} from 'react'
import {SortableElement} from 'react-sortable-hoc'

import './ListItem.css'

const SortableListItem = SortableElement(props => (
    <li
      className = 'ListItem' >
      <input
        id = {props.id}
        type = 'checkbox'
        value = {props.text}
        checked = {props.checked}
        onChange = {props.onChange} />
      <label
        htmlFor = {props.id}>
        {props.text} </label>
      <input
        type = 'text'
        value = {props.text}
        className = 'editingInput'
        onChange = {props.onEditing} />
      <input type = 'button'
        onClick = {props.onRemove}
        value = '&#x2718;' />
      <input type = 'button'
        onClick = {props.onEdit}
        className = {props.editing ? 'editing' : 'edit'}
        value = {props.editing ? '\u2714' : '\u270E'} />
    </li>
))

export default class ListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: props.text,
      editing: false,
      checked: props.checked || false
    }

    this.onChange = this.onChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onEditing = this.onEditing.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  onChange(event) {
    this.setState({
      checked: event.target.checked
    }, this.onUpdate)
  }

  onEdit(event) {
    const input = event.target.parentElement.querySelector('.editingInput'),
          label = event.target.parentElement.querySelector('label')

    if (this.state.editing) {
      label.style.display = 'initial'
      input.style.display = 'none'
      this.setState({
        editing: false
      })
    } else {
      label.style.display = 'none'
      input.style.display = 'initial'
      this.setState({
        editing: true
      })
    }
  }

  onEditing(event) {
    this.setState({
      text: event.target.value
    }, this.onUpdate)
  }

  onRemove(event) {
    this.props.onRemove(this.props.id)
  }

  onUpdate() {
    this.props.onChange({
      id: this.props.id,
      text: this.state.text,
      checked: this.state.checked
    })
  }

  render(){return(
    <SortableListItem
      id = {this.props.id}
      index = {this.props.index}
      text = {this.state.text}
      checked = {this.state.checked}
      onChange = {this.onChange}
      onRemove = {this.onRemove}
      onEdit = {this.onEdit}
      onEditing = {this.onEditing}
      editing = {this.state.editing}
      disabled = {this.state.editing} />
  )}
}
