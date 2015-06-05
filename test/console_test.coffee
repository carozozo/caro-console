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
    cc.log('I am %s and %s years old', name, age)
    cc.log('I am ', name, ' and ', age, ' years old')

  it 'setStyle', ->
    cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline');
    cc.log('This is msg with color-red');
    cc.log('This is msg with color-magenta');
    cc.log.setStyle(null);
    cc.log('This is msg with no style');

    cc.log.setBreakLine();
    cc.log('This is msg with break line (length 20)');
    cc.log.setBreakLine(50)
    cc.log('This is msg with break line (length 40)');

#    cc.log.setColor().setStyle().setBreakLine(0);
    cc.log.resetAll();
    cc.log('This is msg without style');

  it 'createLog', ->
    cc.createLog('err').setOddColor('red').setEvenColor('magenta');
    cc.err('This is Log used for error');
    cc.err('This is Log used for error');

    cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline');
    cc.notice('This is Log used for notice');

  it 'lineLog', ->
    cc.log.setStyle().setBreakLine(0)
    cc.lineLog().log('First log').lineLog(30, false).log('Second log');
    cc.line().log('First log').line(30, false).log('Second log');

  it 'accept', ->
    cc.log.setColor('white');
    cc.createLog('err').setColor('red');
    cc.createLog('info').setColor('green');
    cc.accept('log', 'info');
    cc.log('This is Log');
    cc.info('This is Info');
    cc.err('This is Err');
    cc.accept();
    cc.log('This is Log2');
    cc.info('This is Info2');
    cc.err('This is Err2');
return