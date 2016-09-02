
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
  var color, firstMsg, head, i, j, k, l, len, len1, len2, line, lineLength, msg, msgs, newMsg, oColor, showMe, stacks, style, styles, val;
  msgs = arguments[0];
  firstMsg = msgs[0];
  color = arguments[1];
  styles = arguments[2];
  lineLength = arguments[3];
  showMe = arguments[4];
  head = arguments[5];
  oColor = colors[color] || colors;
  if (styles) {
    for (j = 0, len = styles.length; j < len; j++) {
      style = styles[j];
      oColor = oColor[style] || oColor;
    }
  }
  if (showMe) {
    stacks = caro.getStackList(2, 1) || [];
    console.log(getStackInfo(stacks[0]));
  }
  if (typeof head === 'string' || typeof head === 'function') {
    head = caro.executeIfFn(head) || head;
    console.log(head);
  }
  if (typeof firstMsg === 'string' && firstMsg.indexOf('%s') > -1) {
    for (i = k = 0, len1 = msgs.length; k < len1; i = ++k) {
      val = msgs[i];
      if (i === 0) {
        continue;
      }
      firstMsg = firstMsg.replace('%s', msg);
    }
    msgs = [firstMsg];
  } else {
    for (i = l = 0, len2 = msgs.length; l < len2; i = ++l) {
      msg = msgs[i];
      if (typeof msg === 'undefined') {
        newMsg = oColor('undefined');
      } else if (msg === null) {
        newMsg = oColor('null');
      } else if (Array.isArray(msg)) {
        newMsg = oColor(JSON.stringify(msg, null, 2));
      } else if (typeof msg === 'object') {
        newMsg = oColor(JSON.stringify(msg, null, 2));
      } else if (typeof msg.toString === 'function') {
        newMsg = oColor(msg.toString());
      } else {
        newMsg = oColor(msg);
      }
      msgs[i] = newMsg;
    }
  }
  console.log.apply(null, msgs);
  if (lineLength > 0) {
    line = '';
    caro.loop(function() {
      line += '=';
    }, lineLength);
    return console.log(line);
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
    line = typeof line === 'number' ? line : defaultLineLength;
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
  var str;
  num = typeof num === 'number' ? num : 40;
  ifDouble = ifDouble !== false ? '=' : '-';
  str = '';
  caro.loop(function() {
    str += ifDouble;
  }, num);
  console.log(str);
  return self;
};

self.accept = function() {
  var arg, j, len;
  acceptLogs = [];
  for (j = 0, len = arguments.length; j < len; j++) {
    arg = arguments[j];
    acceptLogs.push(arg);
  }
  return acceptLogs;
};

self.showWhere = function() {
  var stacks;
  stacks = caro.getStackList(1) || [];
  stacks = stacks.map(function(stack) {
    return stack.stack;
  });
  return console.log(stacks);
};

self.createLog('log').setOddColor('blue').setEvenColor('yellow');

module.exports = self;
