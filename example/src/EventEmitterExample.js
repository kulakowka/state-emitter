import React, { Component } from 'react'

import EventEmitter from 'events'

const store = new EventEmitter()

store
  .on('init', function (state) {
    this.emit('change', this.state = state)
  })
  .on('increment', function () {
    this.state.counter++
    this.emit('change', this.state)
  })
  .on('decrement', function () {
    this.state.counter--
    this.emit('change', this.state)
  })
  .on('async-increment', function () {
    setTimeout(() => {
      this.state.counter++
      this.emit('change', this.state)
    }, 1000)
  })
  .on('async-decrement', function () {
    setTimeout(() => {
      this.state.counter--
      this.emit('change', this.state)
    }, 1000)
  })
  .on('change', state => console.log('EventEmitter:', state))

export default class EventEmitterExample extends Component {
  componentDidMount () {
    store
      .on('change', state => this.setState(state))
      .emit('init', { counter: 0 })
  }
  render () {
    const counter = this.state && this.state.counter

    return (
      <div>
        <h1>EventEmitter: {counter}</h1>
        <button onClick={event => store.emit('increment')} >increment</button>
        <button onClick={event => store.emit('decrement')} >decrement</button>
        <button onClick={event => store.emit('async-increment')} >async-increment</button>
        <button onClick={event => store.emit('async-decrement')} >async-decrement</button>
      </div>
    )
  }
}
