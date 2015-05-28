/*! caro-console - v0.2.3 - 2015-05-28 */
(function() {
  var caro, colors, combineMsg, doConsole, extendFn, isObjAndNotFn, self;
  self = {};
  caro = require('caro');
  colors = require('cli-color');
  isObjAndNotFn = function(arg) {
    return caro.isObject(arg) && !caro.isFunction(arg);
  };
  combineMsg = function(msg, variable) {
    if (isObjAndNotFn(msg)) {
      msg = caro.cloneDeep(msg);
    }
    if (arguments.length < 2) {
      variable = '';
    } else if (isObjAndNotFn(variable)) {
      variable = caro.cloneDeep(variable);
    }
    msg = caro.toWord(msg);
    variable = caro.toWord(variable);
    return msg += variable;
  };
  doConsole = function() {
    var aBreakLine, breakLine, color, msg, oColor, styles;
    aBreakLine = [];
    msg = combineMsg.apply(null, arguments[0]);
    color = arguments[1];
    styles = arguments[2];
    breakLine = arguments[3];
    oColor = colors[color] || colors;
    if (styles) {
      caro.forEach(styles, function(style) {
        return oColor = oColor[style] || oColor;
      });
    }
    if (breakLine) {
      caro.loop(function() {
        return aBreakLine.push('-');
      }, 1, breakLine);
    }
    console.log(oColor(msg));
    if (aBreakLine.length > 0) {
      console.log(aBreakLine.join(''));
    }
  };
  extendFn = function() {
    var breakLine, color1, color2, fn, styles;
    color1 = 'white';
    color2 = 'white';
    styles = null;
    breakLine = 0;
    fn = function(msg, variable, line) {
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
      line = caro.isNumber(line) ? line : 20;
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
  module.exports = self;
})();
