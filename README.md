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

### Set your log styles
```javascript
cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline');
cc.log('This is msg with color-red');
cc.log('This is msg with color-magenta');
```

### Create a new log-function for yourself
```javascript
cc.createLog('err').setOddColor('red').setEvenColor('magenta');
cc.err('This is Log used for error');

cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline');
cc.notice('This is Log used for notice');
```

### Settings
- **setColor([color='white']) - set log-color**
```javascript
cc.log.setColor('green');
```
- **setOddColor([color='white']) - set log-color when it's odd**
```javascript
cc.log.setOddColor('green');
```
- **setEvenColor([color='white']) - set log-color when it's even**
```javascript
cc.log.setEvenColor('green');
```
- **setStyle(style...) - set log-style**
```javascript
cc.log.setStyle('bold', 'underline');
```
- **setLine([length=0]) - will print line after each log**
```javascript
cc.log.setLine(40);
```
- **showMe() - show stack-info that log placed**
```javascript
cc.log.showMe();
cc.log.showMe(false);
```
- **resetAll(length=40) - reset all settings**
```javascript
cc.log.setStyle('bold', 'underline');
```

### Method
- **createLog(logName) - create a new log-function**
```javascript
cc.createLog('err').setColor('red');
cc.err('This is Log used for error');
```
- **line([length=40] [ifDouble=true]) - print line**
```javascript
cc.line(); // ========================================
cc.line(40,false); // ----------------------------------------
```
- **accept(logName...) - choice which log-function you want to print**
```javascript
cc.log.setColor('white');
cc.createLog('info').setColor('green');
cc.createLog('err').setColor('red');
if (process.env.ENV_VARIABLE === 'production') {
    // only print cc.err and cc.info in console when production
    cc.accept('err', 'info');
} else {
    cc.accept(); // accept all
}
cc.log('This is Log'); // won't print when production
cc.info('This is Info');
cc.err('This is Err'); 
```

## History
- Add [Settings -> showMe] - v0.6.0
- Remove [Settings -> setBreakLine] - v0.5.2
- Update [Settings -> setLine] lineLength default to 0 - v0.5.2
- Remove [Method -> lineLog] - v0.5.2