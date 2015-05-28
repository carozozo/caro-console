# Caro-Console

The module for easy-reading node.js console base on [cli-color](https://www.npmjs.com/package/cli-color)

## Install and Usage

```bash
$ npm install caro
```

```javascript
var cc = require('caro-console');
cc.log({caro: function(){}}); // print '{caro: function(){})' not '{ caro: [Function] }' 
```

### Print nonstop-log in console
```javascript
cc.log('1', undefined);
cc.log('array=', {a: 1});
cc.log(function(a){return a;});
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