###*
# Console
# @author Caro.Huang
###
do ->
  self = {}
  caro = require 'caro'
  # https://www.npmjs.com/package/cli-color
  colors = require 'cli-color'

  isObjAndNotFn = (arg) ->
    return caro.isObject(arg) and !caro.isFunction(arg)
  combineMsg = (msg, variable) ->
    if isObjAndNotFn(msg)
      msg = caro.clone(msg)
      msg = caro.toWord(msg)
    else
      msg = caro.toString(msg)
    if arguments.length < 2
      variable = ''
    else if isObjAndNotFn(variable)
      variable = caro.clone(variable)
      variable = caro.toWord(variable)
    else
      variable = caro.toString(variable)
    return msg += variable
  doConsole = () ->
    aBreakLine = []
    msg = combineMsg.apply(null, arguments[0])
    color = arguments[1]
    styles = arguments[2]
    breakLine = arguments[3]
    oColor = colors[color] or colors
    if(styles)
      caro.forEach styles, (style) ->
        oColor = oColor[style] or oColor
    if(breakLine)
      caro.loop(() ->
        aBreakLine.push('-')
      , 1, breakLine)
    console.log oColor(msg)
    console.log aBreakLine.join('') if(aBreakLine.length > 0)
    return
  extendFn = () ->
    color1 = 'white'
    color2 = 'white'
    styles = null
    breakLine = 0
    fn = (msg, variable, line) ->
      return console.log() if arguments.length <= 0
      mainColor = color1
      if !@isOdd
        @isOdd = true
        mainColor = color1
      else
        @isOdd = false
        mainColor = color2
      doConsole arguments, mainColor, styles, breakLine
      breakLine = 0
      return fn
    fn.setColor = (color) ->
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
    fn.breakLine = (line) ->
      line = if caro.isNumber(line) then line else 20
      breakLine = line
      return fn
    return fn

  self.log = extendFn().setOddColor('blue').setEvenColor('yellow')

  self.createLog = (logName) ->
    self[logName] = extendFn()
    return self[logName]

  module.exports = self
  return