# Caro-Console

[![Build Status](https://travis-ci.org/carozozo/caro-console.svg?branch=master)](https://travis-ci.org/carozozo/caro-console)  

The module for easy-reading node.js console depend on [cli-color](https://www.npmjs.com/package/cli-color)

## Install and Usage

```bash
$ npm install caro
```

```javascript
var cc = require('caro-console');
cc.log({caro: function(){}}); // print '{caro: function(){})' not '{ caro: [Function] }' 
```

### Print nonstop-log
```javascript
cc.log('This is ', undefined).log('And arr = ', ['caro', 'console']).log('End');

var name = 'caro';
var age = 18;
cc.log('I am %s and %s years old', name, age);
cc.log('I am ', name, ' and ', age, ' years old');
```

### Easy to print line to separate each log
```javascript
cc.lineLog().log('First log').lineLog(30, false).log('Second log');
```

### Set your log styles
```javascript
cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline');
cc.log('This is msg with color-red');
cc.log('This is msg with color-magenta');

cc.log.setBreakLine();
cc.log('This is msg with break line (length 20)');
cc.log.setBreakLine(40)
cc.log('This is msg with break line (length 40)');
```

### Create a new log-function for yourself
```javascript
cc.createLog('err').setOddColor('red').setEvenColor('magenta');
cc.err('This is Log used for error');
cc.err('This is Log used for error');

cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline');
cc.notice('This is Log used for notice');
```