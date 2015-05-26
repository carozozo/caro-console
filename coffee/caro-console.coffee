###*
# Console
# @author Caro.Huang
###
do ->
  self = {}
  caro = require 'caro'
  # https://www.npmjs.com/package/cli-color
  colors = require 'cli-color'

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
    oColor = colors[color] or colors
    if(styles)
      caro.forEach styles, (style) ->
        oColor = oColor[style] or oColor
    console.log oColor(msg)
    return
  extendFn = () ->
    color1 = 'white'
    color2 = 'white'
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
    fn.setColor= (color) ->
      color1 = color
      color2 = color
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

  self.log = extendFn().setOddColor('blue').setEvenColor('yellow')

  self.createLog = (logName) ->
    self[logName] = extendFn()
    return self[logName]

  module.exports = self
  return