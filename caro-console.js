/*! caro-console - v0.0.1 - 2015-05-26 */
(function() {
  var caro, colors, combineMsg, doConsole, self;
  self = {};
  caro = require('caro');
  colors = require('colors');
  combineMsg = function(msg, variable) {
    msg = caro.cloneObj(msg);
    variable = caro.cloneObj(variable);
    msg = caro.coverToStr(msg);
    if (caro.isUndefined(variable)) {
      variable = '';
    }
    variable = caro.coverToStr(variable);
    msg += variable;
    return msg;
  };
  doConsole = function(args, color) {
    var msg, variable;
    if (caro.getObjLength(args) <= 0) {
      return console.log();
    }
    msg = args[0];
    variable = args[1];
    msg = combineMsg(msg, variable);
    if (colors) {
      msg = msg[color];
    }
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
