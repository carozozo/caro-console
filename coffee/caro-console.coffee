###*
# Console
# @author Caro.Huang
###
do ->
  self = {}
  caro = require 'caro'
  # https://www.npmjs.org/package/colors
  colors = require 'colors/safe'

  isPlainObjOrArr = (arg) ->
    return caro.isPlainObject(arg) or caro.isArray(arg)

  combineMsg = (msg, variable) ->
    if isPlainObjOrArr(msg)
      msg = caro.clone(msg)
      msg = caro.toWord(msg)
    else
      msg = caro.toString(msg)
    if arguments.length < 2
      variable = ''
    else if isPlainObjOrArr(variable)
      variable = caro.clone(variable)
      variable = caro.toWord(variable)
    else
      variable = caro.toString(variable)
    msg += variable
    msg

  doConsole = (args, color) ->
    return console.log() if args.length <= 0
    msg = combineMsg.apply(null, arguments[0])
    msg = msg[color]
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