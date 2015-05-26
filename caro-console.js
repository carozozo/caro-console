/*! caro-console - v0.0.2 - 2015-05-26 */
(function() {
  var caro, colors, combineMsg, doConsole, isPlainObjOrArr, self;
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
    msg += variable;
    return msg;
  };
  doConsole = function(args, color) {
    var msg;
    if (args.length <= 0) {
      return console.log();
    }
    msg = combineMsg.apply(null, arguments[0]);
    msg = msg[color];
    console.log(msg);
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'green');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'cyan');
    this.isOdd = true;
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log2 = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'blue');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'yellow');
    this.isOdd = true;
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log3 = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'magenta');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'red');
    this.isOdd = true;
  };
  module.exports = self;
})();
