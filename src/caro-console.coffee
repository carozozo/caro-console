###*
# Console
# @author Caro.Huang
###
self = {}
caro = require 'caro'
# https://www.npmjs.com/package/cli-color
colors = require 'cli-color'
defaultColor = 'white'
defStyle = null
defaultLineLength = 0
defShowMe = false
defHead = null
acceptLogs = []

getStackInfo = (stack) ->
  return if !stack
  stack.stack

doConsole = ->
  msgs = arguments[0]
  firstMsg = msgs[0]
  color = arguments[1]
  styles = arguments[2]
  lineLength = arguments[3]
  showMe = arguments[4]
  head = arguments[5]
  oColor = colors[color] or colors

  if(styles)
    for style in styles
      oColor = oColor[style] or oColor
  if(showMe)
    stacks = caro.getStackList(2, 1) or []
    console.log getStackInfo(stacks[0])
  if(typeof head is 'string' or typeof head is 'function')
    head = caro.executeIfFn(head) or head
    console.log head

  if(typeof firstMsg is 'string' and firstMsg.indexOf('%s') > -1)
    for val, i in msgs
      continue if(i is 0)
      firstMsg = firstMsg.replace('%s', msg)
    msgs = [firstMsg]
  else
    for msg, i in msgs
      if(typeof msg is 'undefined')
        newMsg = oColor('undefined')
      else if(msg is null)
        newMsg = oColor('null')
      else if(Array.isArray(msg))
        newMsg = oColor(JSON.stringify(msg, null, 2))
      else if(typeof msg is 'object')
        newMsg = oColor(JSON.stringify(msg, null, 2))
      else if(typeof msg.toString is 'function')
        newMsg = oColor(msg.toString())
      else
        newMsg = oColor(msg)
      msgs[i] = newMsg

  console.log.apply(null, msgs)
  if(lineLength > 0)
    line = ''
    caro.loop(->
      line += '='
      return
    , lineLength)
    console.log line

extendFn = ->
  color1 = defaultColor
  color2 = defaultColor
  styles = defStyle
  lineLength = defaultLineLength
  showMe = defShowMe
  head = defHead
  fn = (msg, variable) ->
    return if acceptLogs.length > 0 and acceptLogs.indexOf(fn.logName) < 0
    return console.log() if arguments.length <= 0
    mainColor = color1
    if !@isOdd
      @isOdd = true
    else
      @isOdd = false
      mainColor = color2
    doConsole arguments, mainColor, styles, lineLength, showMe, head
    self
  fn.setColor = (color) ->
    color1 = color or defaultColor
    color2 = color or defaultColor
    fn
  fn.setOddColor = (color) ->
    color1 = color or defaultColor
    fn
  fn.setEvenColor = (color) ->
    color2 = color or defaultColor
    fn
  fn.setStyle = ->
    styles = arguments
    fn
  fn.setLine = (line) ->
    line = if typeof line is 'number' then line else defaultLineLength
    lineLength = line
    fn
  fn.showMe = (ifShowMe) ->
    showMe = ifShowMe != false
    fn
  fn.head = (pre) ->
    head = pre
  fn.resetAll = ->
    color1 = defaultColor
    color2 = defaultColor
    styles = defStyle
    lineLength = defaultLineLength
    showMe = defShowMe
    head = defHead
    fn
  fn

self.createLog = (logName) ->
  self[logName] = extendFn()
  self[logName].logName = logName
  return self[logName]

self.line = (num, ifDouble) ->
  num = if typeof num is 'number' then num else 40
  ifDouble = if ifDouble != false then '=' else '-'
  str = ''
  caro.loop(->
    str += ifDouble
    return
  , num)
  console.log str
  self

self.accept = ->
  acceptLogs = []
  for arg in arguments
    acceptLogs.push(arg)
  acceptLogs

self.showWhere = ->
  stacks = caro.getStackList(1) or []
  stacks = stacks.map((stack) ->
    stack.stack
  )
  console.log(stacks)

self.createLog('log').setOddColor('blue').setEvenColor('yellow')

module.exports = self