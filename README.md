# Caro-Console

## The library for easy-reading node.js console base on [colors](https://www.npmjs.com/package/colors)

## Install and Usage

```bash
$ npm install caro
```

```javascript
var cc = require('caro-console');
cc.log({caro: 'caro'}); // print '{caro: "caro"}' not '[Object]' 
```

### Print log in console
```javascript
cc.log('1', undefined); // '1undefined'
cc.log(); // ''
cc.log(2, {a: 1}); // '2{"a": 1}'
cc.log(function(a){return a;}); // 'function(a){return a;}'
```

### Set your log styles
```javascript
cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline')
cc.log('This is msg with color-red');
cc.log('This is msg with color-magenta');
```

### Create a new log-function for yourself
```javascript
cc.createLog('err').setOddColor('red').setEvenColor('magenta');
cc.err('This is Log used for error');
cc.err('This is Log used for error');

cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline');
cc.notice('This is Log used for notice');
```