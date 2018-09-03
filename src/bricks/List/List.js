import React, {Component} from 'react'
import {SortableContainer, arrayMove} from 'react-sortable-hoc'

import ListItem from './ListItem'
import ListItemNew from './ListItemNew'

import './List.css'

const SortableList = SortableContainer(({items, onRemove, onChange}) =>
    <div>
      {items.map((value, index) => <ListItem
          id = {value.id}
          key = {`item-${index}`}
          index = {index}
          text = {value.text}
          checked = {value.checked}
          onRemove = {onRemove}
          onChange = {onChange} />)}
    </div>
)

export default class List extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: this.props.items
    }

    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onAdd({id: id, text: text}) {
    this.setState(prevState => ({
      items: [...prevState.items, {
        id: id,
        text: text,
        checked: false
      }]
    }), this.onUpdate)
  }

  onRemove(id) {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }), this.onUpdate)
  }

  onChange({id: id, text: text, checked: checked}) {
    this.setState(prevState => {
      const items = prevState.items,
            item = items.filter(item => item.id === id)[0],
            index = items.indexOf(item)
      items[index] = Object.assign(item, arguments[0])
      return {
        items: items
    }}, this.onUpdate)
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState(prevState => ({
      items: arrayMove(prevState.items, oldIndex, newIndex)
    }), this.onUpdate)
  }

  onUpdate() {
    this.props.onUpdate(this.state.items)
  }

  render(){return(
    <div
      className = "List">
      <ul>
        <SortableList
          helperClass = 'sorting'
          lockAxis = 'y'
          lockToContainerEdges = {true}
          items = {this.state.items}
          onRemove = {this.onRemove}
          onChange = {this.onChange}
          onSortEnd = {this.onSortEnd} />
        <li
          className = 'ListItem'>
          <ListItemNew
            onSubmit = {this.onAdd} />
        </li>
      </ul>
    </div>
  )}
}