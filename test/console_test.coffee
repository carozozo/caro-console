do ->
describe 'Console', ->
  it 'log', ->
    cc.log('This is ', undefined).log('And arr = ', ['caro', 'console']);
    cc.log('obj is ', {
      a: 1,
      b: ()->
        return null
      c: ['r']
    }).log('And function is', -> return 'abc');
    a = ()->
      return '123'
    cc.log(a)

    name = 'caro';
    age = 18
    cc.log('I am %s and %s age', name, age)
    cc.log('I am ', name, ' and ', age,' age')

  it 'setStyle', ->
    cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline');
    cc.log('This is msg with color-red');
    cc.log('This is msg with color-magenta');
    cc.log.setStyle(null);
    cc.log('This is msg with no style');

    cc.log.setBreakLine();
    cc.log('This is msg with break line (length 20)');
    cc.log.setBreakLine(40)
    cc.log('This is msg with break line (length 40)');
    cc.log.setBreakLine(0)
    cc.log('This is msg without break line');

  it 'createLog', ->
    cc.createLog('err').setOddColor('red').setEvenColor('magenta');
    cc.err('This is Log used for error');
    cc.err('This is Log used for error');

    cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline');
    cc.notice('This is Log used for notice');

  it 'lineLog', ->
    cc.log.setStyle(null).setBreakLine(0)
    cc.lineLog().log('First log').lineLog(30, false).log('Second log');

return