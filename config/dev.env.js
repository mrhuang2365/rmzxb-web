'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"aHR0cDovLzEwNi4zOC4yOC4xMDk6MTIyMTg="',
  LOCAL_API: '"aHR0cDovLzE3Mi4yMC4yNTQuMjI1OjEyMjE4"'
})
