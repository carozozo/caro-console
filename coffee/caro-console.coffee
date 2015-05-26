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
    return msg += variable
  doConsole = () ->
    msg = combineMsg.apply(null, arguments[0])
    color = arguments[1]
    styles = arguments[2]
    msg = msg[color]
    if(styles)
      caro.forEach styles, (style) ->
        msg = msg[style] or msg
    console.log msg
    return
  extendFn = () ->
    color1 = 'blue'
    color2 = 'yellow'
    styles = null
    fn = (msg, variable) ->
      return console.log() if arguments.length <= 0
      if !@isOdd
        doConsole arguments, color1, styles
        @isOdd = true
        return
      doConsole arguments, color2, styles
      @isOdd = false
      return fn
    fn.setOddColor = (color) ->
      color1 = color
      return fn
    fn.setEvenColor = (color) ->
      color2 = color
      return fn
    fn.setStyle = () ->
      styles = arguments
      return fn
    return fn

  self.log = extendFn()

  self.createLog = (logName) ->
    self[logName] = extendFn()
    return self[logName]

  module.exports = self
  return