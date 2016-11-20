const EventEmitter = require('events')

class StateEmitter extends EventEmitter {
  constructor (state = {}) {
    super()
    this.state = state || {}
  }
  emit (event, state) {
    if (state) this.state = state
    super.emit(event, this.state, this.emit.bind(this))
    return this
  }
}

module.exports = StateEmitter
