###*
# Console
# @author Caro.Huang
###
self = {}
caro = require 'caro'
# https://www.npmjs.com/package/cli-color
colors = require 'cli-color'
defaultLineLength = 40

combineMsg = (msg) ->
  args = caro.drop(arguments)
  msg = caro.toWord(msg)
  caro.forEach(args, (val) ->
    val = caro.toWord(val)
    if(msg.indexOf('%s') > -1)
      msg = msg.replace('%s', val)
    else
      msg += val
  )
  return msg
doConsole = () ->
  msg = combineMsg.apply(null, arguments[0])
  color = arguments[1]
  styles = arguments[2]
  lineLength = arguments[3]
  oColor = colors[color] or colors
  if(styles)
    caro.forEach styles, (style) ->
      oColor = oColor[style] or oColor
  console.log oColor(msg)
  console.log caro.repeat('=', lineLength) if(lineLength > 0)
extendFn = () ->
  color1 = 'white'
  color2 = 'white'
  styles = null
  breakLine = 0
  fn = (msg, variable) ->
    return console.log() if arguments.length <= 0
    mainColor = color1
    if !@isOdd
      @isOdd = true
      mainColor = color1
    else
      @isOdd = false
      mainColor = color2
    doConsole arguments, mainColor, styles, breakLine
    return self
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
  fn.setBreakLine = (line) ->
    line = if caro.isNumber(line) then line else defaultLineLength
    breakLine = line
    return fn
  return fn

self.log = extendFn().setOddColor('blue').setEvenColor('yellow')

self.createLog = (logName) ->
  self[logName] = extendFn()
  return self[logName]

self.lineLog = (num, line) ->
  num = if caro.isNumber(num) then num else defaultLineLength
  line = if line != false then '=' else '-'
  console.log caro.repeat line, num
  return self

module.exports = self