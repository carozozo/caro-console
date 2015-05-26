
/**
 * Console
 * @author Caro.Huang
 */
(function() {
  var caro, colors, combineMsg, doConsole, extendFn, isPlainObjOrArr, self;
  self = {};
  caro = require('caro');
  colors = require('colors/safe');
  isPlainObjOrArr = function(arg) {
    return caro.isPlainObject(arg) || caro.isArray(arg);
  };
  combineMsg = function(msg, variable) {
    if (isPlainObjOrArr(msg)) {
      msg = caro.clone(msg);
      msg = caro.toWord(msg);
    } else {
      msg = caro.toString(msg);
    }
    if (arguments.length < 2) {
      variable = '';
    } else if (isPlainObjOrArr(variable)) {
      variable = caro.clone(variable);
      variable = caro.toWord(variable);
    } else {
      variable = caro.toString(variable);
    }
    return msg += variable;
  };
  doConsole = function() {
    var color, msg, styles;
    msg = combineMsg.apply(null, arguments[0]);
    color = arguments[1];
    styles = arguments[2];
    msg = msg[color];
    if (styles) {
      caro.forEach(styles, function(style) {
        return msg = msg[style] || msg;
      });
    }
    console.log(msg);
  };
  extendFn = function() {
    var color1, color2, fn, styles;
    color1 = 'blue';
    color2 = 'yellow';
    styles = null;
    fn = function(msg, variable) {
      if (arguments.length <= 0) {
        return console.log();
      }
      if (!this.isOdd) {
        doConsole(arguments, color1, styles);
        this.isOdd = true;
        return;
      }
      doConsole(arguments, color2, styles);
      this.isOdd = false;
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
    return fn;
  };
  self.log = extendFn();
  self.createLog = function(logName) {
    self[logName] = extendFn();
    return self[logName];
  };
  module.exports = self;
})();
