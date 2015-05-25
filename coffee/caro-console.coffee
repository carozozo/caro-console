###*
# Console
# @author Caro.Huang
###
do ->
  self = {}
  caro = require 'caro'
  # https://www.npmjs.org/package/colors
  colors = require 'colors'

  combineMsg = (msg, variable) ->
    msg = caro.assign({}, msg)
    variable = caro.assign({}, variable)
    msg = caro.toString(msg)
    variable = '' if caro.isUndefined(variable)
    variable = caro.toString(variable)
    msg += variable
    msg

  doConsole = (args, color) ->
    return console.log() if args.length <= 0
    msg = args[0]
    variable = args[1]
    msg = combineMsg(msg, variable)
    msg = msg[color] if colors
    console.log msg
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'green'
      @isOdd = false
      return
    doConsole arguments, 'cyan'
    @isOdd = true
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log2 = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'blue'
      @isOdd = false
      return
    doConsole arguments, 'yellow'
    @isOdd = true
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log3 = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'magenta'
      @isOdd = false
      return
    doConsole arguments, 'red'
    @isOdd = true
    return

  module.exports = self
  return