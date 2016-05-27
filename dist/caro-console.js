
/**
 * Console
 * @author Caro.Huang
 */
var acceptLogs, caro, colors, defHead, defShowMe, defStyle, defaultColor, defaultLineLength, doConsole, extendFn, getStackInfo, self;

self = {};

caro = require('caro');

colors = require('cli-color');

defaultColor = 'white';

defStyle = null;

defaultLineLength = 0;

defShowMe = false;

defHead = null;

acceptLogs = [];

getStackInfo = function(stack) {
  if (!stack) {
    return;
  }
  return stack.stack;
};

doConsole = function() {
  var color, firstMsg, head, lineLength, msgs, oColor, showMe, stacks, styles;
  msgs = arguments[0];
  firstMsg = msgs[0];
  color = arguments[1];
  styles = arguments[2];
  lineLength = arguments[3];
  showMe = arguments[4];
  head = arguments[5];
  oColor = colors[color] || colors;
  if (styles) {
    caro.forEach(styles, function(style) {
      return oColor = oColor[style] || oColor;
    });
  }
  if (showMe) {
    stacks = caro.getStackList(2, 1) || [];
    console.log(getStackInfo(stacks[0]));
  }
  if (caro.isString(head) || caro.isFunction(head)) {
    head = caro.executeIfFn(head) || head;
    console.log(head);
  }
  if (caro.isString(firstMsg) && firstMsg.indexOf('%s') > -1) {
    caro.forEach(msgs, function(msg, i) {
      if (i === 0) {
        return;
      }
      return firstMsg = firstMsg.replace('%s', msg);
    });
    msgs = [firstMsg];
  } else {
    caro.forEach(msgs, function(msg, i) {
      var newMsg;
      if (caro.isUndefined(msg)) {
        newMsg = oColor('undefined');
      } else if (msg === null) {
        newMsg = oColor('null');
      } else if (caro.isArray(msg)) {
        newMsg = oColor(JSON.stringify(msg, null, 2));
      } else if (caro.isPlainObject(msg)) {
        newMsg = oColor(JSON.stringify(msg, null, 2));
      } else if (caro.isFunction(msg.toString)) {
        newMsg = oColor(msg.toString());
      } else {
        newMsg = oColor(msg);
      }
      msgs[i] = newMsg;
    });
  }
  console.log.apply(null, msgs);
  if (lineLength > 0) {
    return console.log(caro.repeat('=', lineLength));
  }
};

extendFn = function() {
  var color1, color2, fn, head, lineLength, showMe, styles;
  color1 = defaultColor;
  color2 = defaultColor;
  styles = defStyle;
  lineLength = defaultLineLength;
  showMe = defShowMe;
  head = defHead;
  fn = function(msg, variable) {
    var mainColor;
    if (acceptLogs.length > 0 && acceptLogs.indexOf(fn.logName) < 0) {
      return;
    }
    if (arguments.length <= 0) {
      return console.log();
    }
    mainColor = color1;
    if (!this.isOdd) {
      this.isOdd = true;
    } else {
      this.isOdd = false;
      mainColor = color2;
    }
    doConsole(arguments, mainColor, styles, lineLength, showMe, head);
    return self;
  };
  fn.setColor = function(color) {
    color1 = color || defaultColor;
    color2 = color || defaultColor;
    return fn;
  };
  fn.setOddColor = function(color) {
    color1 = color || defaultColor;
    return fn;
  };
  fn.setEvenColor = function(color) {
    color2 = color || defaultColor;
    return fn;
  };
  fn.setStyle = function() {
    styles = arguments;
    return fn;
  };
  fn.setLine = function(line) {
    line = caro.isNumber(line) ? line : defaultLineLength;
    lineLength = line;
    return fn;
  };
  fn.showMe = function(ifShowMe) {
    showMe = ifShowMe !== false;
    return fn;
  };
  fn.head = function(pre) {
    return head = pre;
  };
  fn.resetAll = function() {
    color1 = defaultColor;
    color2 = defaultColor;
    styles = defStyle;
    lineLength = defaultLineLength;
    showMe = defShowMe;
    head = defHead;
    return fn;
  };
  return fn;
};

self.createLog = function(logName) {
  self[logName] = extendFn();
  self[logName].logName = logName;
  return self[logName];
};

self.line = function(num, ifDouble) {
  num = caro.isNumber(num) ? num : 40;
  ifDouble = ifDouble !== false ? '=' : '-';
  console.log(caro.repeat(ifDouble, num));
  return self;
};

self.accept = function() {
  return acceptLogs = caro.values(arguments);
};

self.showWhere = function() {
  var stacks;
  stacks = caro.getStackList(1) || [];
  stacks = caro.map(stacks, function(stack) {
    return stack.stack;
  });
  return console.log(stacks);
};

self.createLog('log').setOddColor('blue').setEvenColor('yellow');

module.exports = self;