# State Emitter

[![npm package](https://nodei.co/npm/stateemitter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/stateemitter/)

[![NPM version](http://img.shields.io/npm/v/stateemitter.svg)](https://www.npmjs.org/package/stateemitter)
[![Dependency Status](https://david-dm.org/kulakowka/state-emitter.svg)](https://david-dm.org/kulakowka/state-emitter)


Control application state with events.

#### Install

```
npm install state-emitter --save
```

#### Example preview 

```javascript
import StateEmitter from 'state-emitter'

// Create store
const store = new StateEmitter()

// Add actions
store
  .on('increment', (state, emit) => emit('change', { counter: state.counter + 1 }))
  .on('decrement', (state, emit) => emit('change', { counter: state.counter - 1 }))

// Add logger
store
  .on('change', state => console.log('StateEmitter:', state))

// Create initial state
store.emit('change', { counter: 0 })

// Emit actions
store.emit('increment')
store.emit('decrement')
```

#### Example with [React.js](https://facebook.github.io/react/)

```
git clone https://github.com/kulakowka/state-emitter
cd state-emitter/example
npm install
npm start
```

#### Example preview 

```javascript
import React, { Component } from 'react'
import StateEmitter from 'stateemitter'

// Create store
const store = new StateEmitter()

// Add actions
store
  .on('increment', (state, emit) => emit('change', { counter: state.counter + 1 }))
  .on('decrement', (state, emit) => emit('change', { counter: state.counter - 1 }))

// Add logger
store
  .on('change', state => console.log('StateEmitter:', state))

// Create react component
class StateEmitterExample extends Component {

  componentDidMount () {

    // subscribe to state changes
    store.on('change', state => this.setState(state))
    
    // create initial state
    store.emit('change', { counter: 0 })
  }

  render () {
    const counter = this.state && this.state.counter

    return (
      <div>
        <h1>StateEmitter: {counter}</h1>

        <button onClick={event => store.emit('increment')} >increment</button>
        <button onClick={event => store.emit('decrement')} >decrement</button>
        <button onClick={event => store.emit('async-increment')} >async-increment</button>
        <button onClick={event => store.emit('async-decrement')} >async-decrement</button>
      </div>
    )
  }
}
```

#### Control state with simple Event Emitter

```javascript
// import standart node.js package
const EventEmitter = require('events')

// import react.js
const React, { Component } = require('react')

// Create store instance with Event Emitter
const store = new EventEmitter()

// Add event listener for replace state
store.on('change', state => {
  store.state = state
})

// Add event listeners for actions
store.on('increment', state => store.emit('change', { counter: store.state.counter + 1 }))
store.on('decrement', state => store.emit('change', { counter: store.state.counter - 1 }))

// Add logger
store.on('change', state => console.log('store state changed:', state))

// Create initial state
store.state = {
  counter: 0
}

// Emit actions
store.emit('increment') // => store.state = { counter: 1 }
store.emit('decrement') // => store.state = { counter: 0 }

// Create react component
class Example extends Component {
  constructor () {
    super()
    this.state = store.state
  }

  componentDidMount () {
    // subscribe to state changes
    store.on('change', state => this.setState(state))
  }

  render () {
    const counter = this.state && this.state.counter

    return (
      <div>
        <h1>counter: {counter}</h1>

        <button onClick={event => store.emit('increment')} >+</button>
        <button onClick={event => store.emit('decrement')} >-</button>
      </div>
    )
  }
}
```
