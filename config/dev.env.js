'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://106.38.28.109:12218"',
  LOCAL_API: '"http://172.20.254.225:12218"'
})
