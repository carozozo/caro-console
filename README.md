# Caro-Console
The library for easy-reading console.log

## Install and Usage

### In Node.js
```bash
$ npm install caro
```

```javascript
var cconsole = require('caro-console');
cconsole.log({caro: 'caro'}); // print '{caro: "caro"}' not [Object] 
```

- **log(msg, variable) - 輸出 console 訊息**
```javascript
caro.log('1', undefined); // '1undefined'
caro.log(); // ''
caro.log(2, {a: 1}); // '2{"a": 1}'
caro.log(function(a){return a;}); // 'function(a){return a;}'
```
- **log2(msg, variable) - 輸出 console 訊息**
```javascript
caro.log2(undefined); // 'undefined'
caro.log2('1', undefined); // '1undefined'
caro.log2('2', {}); // '2{}'
```
- **log3(msg, variable) - 輸出 console 訊息**
```javascript
caro.log3(2, {a: 1}); // '2{"a": 1}'
caro.log3('1', undefined); // '1undefined'
caro.log3('2', null); // '2null'
```