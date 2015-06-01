
/**
 * Console
 * @author Caro.Huang
 */
var caro, colors, combineMsg, defaultLineLength, doConsole, extendFn, self;

self = {};

caro = require('caro');

colors = require('cli-color');

defaultLineLength = 40;

combineMsg = function(msg, variable) {
  if (arguments.length < 2) {
    variable = '';
  }
  msg = caro.toWord(msg);
  variable = caro.toWord(variable);
  return msg += variable;
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
  color1 = 'white';
  color2 = 'white';
  styles = null;
  breakLine = 0;
  fn = function(msg, variable) {
    var mainColor;
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
    color1 = color;
    color2 = color;
    return fn;
  };
  fn.setOddColor = function(color) {
    color1 = color;
    return fn;
  };
  fn.setEvenColor = function(color) {
    color2 = color;
    return fn;
  };
  fn.setStyle = function() {
    styles = arguments;
    return fn;
  };
  fn.setBreakLine = function(line) {
    line = caro.isNumber(line) ? line : defaultLineLength;
    breakLine = line;
    return fn;
  };
  return fn;
};

self.log = extendFn().setOddColor('blue').setEvenColor('yellow');

self.createLog = function(logName) {
  self[logName] = extendFn();
  return self[logName];
};

self.lineLog = function(num, line) {
  num = caro.isNumber(num) ? num : defaultLineLength;
  line = line !== false ? '=' : '-';
  console.log(caro.repeat(line, num));
  return self;
};

module.exports = self;
