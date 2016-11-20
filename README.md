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