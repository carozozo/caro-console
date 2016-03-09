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
    caro.forEach styles, (style) ->
      oColor = oColor[style] or oColor
  if(showMe)
    stacks = caro.getStackList(2, 1) or []
    console.log getStackInfo(stacks[0])
  if(caro.isString(head) or caro.isFunction(head))
    head = caro.executeIfFn(head) or head
    console.log head

  if(caro.isString(firstMsg) and firstMsg.indexOf('%s') > -1)
    caro.forEach(msgs, (msg, i) ->
      return if(i is 0)
      firstMsg = firstMsg.replace('%s', msg)
    )
    msgs = [firstMsg]
  else
    caro.forEach(msgs, (msg, i) ->
      if(caro.isUndefined(msg))
        newMsg = oColor('undefined')
      else if(caro.isArray(msg))
        newMsg = oColor(JSON.stringify(msg))
      else if(caro.isPlainObject(msg))
        newMsg = oColor(JSON.stringify(msg, null, 2))
      else if(caro.isFunction(msg.toString))
        newMsg = oColor(msg.toString())
      else
        newMsg = oColor(msg)
      msgs[i] = newMsg
      return
    )

  console.log.apply(null, msgs)
  console.log caro.repeat('=', lineLength) if(lineLength > 0)

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
    line = if caro.isNumber(line) then line else defaultLineLength
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
  num = if caro.isNumber(num) then num else 40
  ifDouble = if ifDouble != false then '=' else '-'
  console.log caro.repeat ifDouble, num
  self

self.accept = ->
  acceptLogs = caro.values(arguments)

self.showWhere = ->
  stacks = caro.getStackList(1) or []
  stacks = caro.map(stacks, (stack) ->
    stack.stack
  )
  console.log(stacks)

self.createLog('log').setOddColor('blue').setEvenColor('yellow')

module.exports = self