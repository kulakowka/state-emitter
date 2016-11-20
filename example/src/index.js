import React from 'react'
import ReactDOM from 'react-dom'
import StateEmitterExample from './StateEmitterExample'
import EventEmitterExample from './EventEmitterExample'

ReactDOM.render(
  <div >
    <StateEmitterExample />
    <EventEmitterExample />
  </div>,
  document.getElementById('root')
)
