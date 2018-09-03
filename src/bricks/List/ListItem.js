import React, {Component} from 'react'
import {SortableElement} from 'react-sortable-hoc'

import './ListItem.css'

const SortableListItem = SortableElement(({
  id,
  index,
  text,
  editing,
  checked,
  onChange,
  onEdit,
  onEditing,
  onRemove}) => (
    <li
      className = 'ListItem'>
      <input
        id = {id}
        type = 'checkbox'
        value = {text}
        checked = {checked}
        onChange = {onChange} />
      <label
        htmlFor = {id}>
        {text} </label>
      <input
        type = 'text'
        value = {text}
        className = 'editingInput'
        onChange = {onEditing} />
      <input type = 'button'
        onClick = {onRemove}
        value = '&#x2718;' />
      <input type = 'button'
        onClick = {onEdit}
        className = {editing ? 'editing' : 'edit'}
        value = {editing ? '\u2714' : '\u270E'} />
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
      key = {`item-${this.props.index}`}
      index = {this.props.index}
      text = {this.state.text}
      editing = {this.state.editing}
      checked = {this.state.checked}
      onChange = {this.onChange}
      onEdit = {this.onEdit}
      onEditing = {this.onEditing}
      onRemove = {this.onRemove}
      disabled = {this.state.editing}/>
  )}
}