'use strict'

const logger = require('./logger')

function set (cache, key, value, ttl) {
  cache.entries[key] = {
    value,
    ttl,
    created: Date.now()
  }
  return true
}

function get (cache, key) {
  const store = cache.entries[key] || {}
  return store.value
}

function del (cache, key) {
  delete cache.entries[key]
}

function swipe (cache, interval = 1000) {
  clearInterval(cache.swipeTimerId)
  cache.swipeTimerId = setInterval(() => {
    const keys = Object.keys(cache.entries)
    if (keys.length > 10000) {
      cache.entries = {}
      logger.warn(
        'inMemory reached max (1000) number of entries, all keys now being deleted.'
      )
      return
    }
    let entry
    const now = Date.now()
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index]
      entry = cache.entries[key]
      if (now - entry.created > entry.ttl) {
        delete cache.entries[key]
      }
    }
  }, interval)
  return cache.swipeTimerId
}

function bootstrap (cache) {
  cache.set = set.bind(null, cache)
  cache.get = get.bind(null, cache)
  cache.del = del.bind(null, cache)
  cache.swipe = swipe.bind(null, cache)
  cache.swipe()
  return cache
}

function create (options) {
  const Cache = {
    entries: {},
    set: null,
    get: null,
    del: null,
    swipe: null
  }
  return bootstrap(Cache)
}

module.exports = {
  set,
  get,
  del,
  swipe,
  create,
  bootstrap
}
