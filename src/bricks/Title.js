import React, {Component} from 'react'

import './Title.css'

const Title = ({name, desc, count}) => {return(
  <div
     className = 'Title'>
    <h3>
      {name}' {desc}
    </h3>
    <span>
      You have {count} tasks to go...
    </span>
  </div>
)}

export default Title