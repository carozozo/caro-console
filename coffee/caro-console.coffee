###*
# Console
# @author Caro.Huang
###
do ->
  self = {}
  caro = require 'caro'
  # https://www.npmjs.org/package/colors
  colors = require 'colors'

  isPlainObjOrArr = (arg)->
    return caro.isPlainObject(arg) or caro.isArray(arg)

  combineMsg = (msg, variable) ->
    if isPlainObjOrArr(msg)
      if caro.isPlainObject(msg)
        msg = caro.assign({}, msg)
      if caro.isArray(msg)
        msg = caro.assign([], msg)
      msg = caro.toWord(msg)
    else
      msg = caro.toString(msg)
    if arguments.length < 2
      variable = ''
    else if isPlainObjOrArr(variable)
      if caro.isPlainObject(variable)
        variable = caro.assign({}, variable)
      if caro.isArray(msg)
        variable = caro.assign([], variable)
      variable = caro.toWord(variable)
    else
      variable = caro.toString(variable)
    msg += variable
    msg

  doConsole = (args, color) ->
    return console.log() if args.length <= 0
    msg = combineMsg.apply(null, arguments[0])
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