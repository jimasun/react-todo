import React, {Component} from 'react'
import {render} from 'react-dom'

import App from './sites/App'

import 'reset-css'
import './index.css'

render(
  <App/>,
  document.querySelector('#root')
)