
/**
 * Console
 * @author Caro.Huang
 */
var acceptLogs, caro, colors, combineMsg, defShowMe, defStyle, defaultColor, defaultLineLength, doConsole, extendFn, getStackInfo, self;

self = {};

caro = require('caro');

colors = require('cli-color');

defaultColor = 'white';

defStyle = null;

defaultLineLength = 0;

defShowMe = false;

acceptLogs = [];

getStackInfo = function(stack) {
  if (!stack) {
    return;
  }
  return stack.stack;
};

combineMsg = function(msg) {
  var args;
  args = caro.drop(arguments);
  msg = caro.toWord(msg);
  caro.forEach(args, function(val) {
    val = caro.toWord(val);
    if (msg.indexOf('%s') > -1) {
      return msg = msg.replace('%s', val);
    } else {
      return msg += val;
    }
  });
  return msg;
};

doConsole = function() {
  var color, lineLength, msg, oColor, showMe, stacks, styles;
  msg = combineMsg.apply(null, arguments[0]);
  color = arguments[1];
  styles = arguments[2];
  lineLength = arguments[3];
  showMe = arguments[4];
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
  console.log(oColor(msg));
  if (lineLength > 0) {
    return console.log(caro.repeat('=', lineLength));
  }
};

extendFn = function() {
  var color1, color2, fn, lineLength, showMe, styles;
  color1 = defaultColor;
  color2 = defaultColor;
  styles = defStyle;
  lineLength = defaultLineLength;
  showMe = defShowMe;
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
    doConsole(arguments, mainColor, styles, lineLength, showMe);
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
  fn.resetAll = function() {
    color1 = defaultColor;
    color2 = defaultColor;
    styles = defStyle;
    lineLength = defaultLineLength;
    showMe = defShowMe;
    return fn;
  };
  return fn;
};

self.createLog = function(logName) {
  self[logName] = extendFn();
  self[logName].logName = logName;
  return self[logName];
};

self.line = function(num, line) {
  num = caro.isNumber(num) ? num : 40;
  line = line !== false ? '=' : '-';
  console.log(caro.repeat(line, num));
  return self;
};

self.accept = function() {
  return acceptLogs = caro.values(arguments);
};

self.createLog('log').setOddColor('blue').setEvenColor('yellow');

module.exports = self;
