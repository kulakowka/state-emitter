import React, { Component } from 'react'

import StateEmitter from '../../src'

const store = new StateEmitter()

store
  .on('increment', (state, emit) => {
    emit('change', { counter: state.counter + 1 })
  })
  .on('decrement', (state, emit) => {
    emit('change', { counter: state.counter - 1 })
  })
  .on('async-increment', (state, emit) => {
    setTimeout(() => {
      emit('change', { counter: state.counter + 1 })
    }, 1000)
  })
  .on('async-decrement', (state, emit) => {
    setTimeout(() => {
      emit('change', { counter: state.counter - 1 })
    }, 1000)
  })
  .on('change', state => console.log('StateEmitter:', state))

export default class StateEmitterExample extends Component {
  componentDidMount () {
    store
      .on('change', state => this.setState(state))
      .emit('change', { counter: 0 })
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
