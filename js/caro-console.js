
/**
 * Console
 * @author Caro.Huang
 */
var acceptLogs, caro, colors, combineMsg, defaultColor, defaultLineLength, doConsole, extendFn, self;

self = {};

caro = require('caro');

colors = require('cli-color');

defaultColor = 'white';

defaultLineLength = 40;

acceptLogs = [];

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
  var color, lineLength, msg, oColor, styles;
  msg = combineMsg.apply(null, arguments[0]);
  color = arguments[1];
  styles = arguments[2];
  lineLength = arguments[3];
  oColor = colors[color] || colors;
  if (styles) {
    caro.forEach(styles, function(style) {
      return oColor = oColor[style] || oColor;
    });
  }
  console.log(oColor(msg));
  if (lineLength > 0) {
    return console.log(caro.repeat('=', lineLength));
  }
};

extendFn = function() {
  var breakLine, color1, color2, fn, styles;
  color1 = defaultColor;
  color2 = defaultColor;
  styles = null;
  breakLine = 0;
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
      mainColor = color1;
    } else {
      this.isOdd = false;
      mainColor = color2;
    }
    doConsole(arguments, mainColor, styles, breakLine);
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
  fn.setLine = fn.setBreakLine = function(line) {
    line = caro.isNumber(line) ? line : defaultLineLength;
    breakLine = line;
    return fn;
  };
  fn.resetAll = function() {
    color1 = defaultColor;
    color2 = defaultColor;
    styles = null;
    return breakLine = 0;
  };
  return fn;
};

self.createLog = function(logName) {
  self[logName] = extendFn();
  self[logName].logName = logName;
  return self[logName];
};

self.line = self.lineLog = function(num, line) {
  num = caro.isNumber(num) ? num : defaultLineLength;
  line = line !== false ? '=' : '-';
  console.log(caro.repeat(line, num));
  return self;
};

self.accept = function() {
  return acceptLogs = caro.values(arguments);
};

self.createLog('log').setOddColor('blue').setEvenColor('yellow');

module.exports = self;
