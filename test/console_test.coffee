do ->
describe 'Console', ->
  it 'log', ->
    cc.log('This is ', undefined).log('And arr = ', ['caro', 'console']);
    cc.log('obj is ', {
      a: 1,
      b: ()->
        return null
      c: ['r']
    });
    name = 'caro';
    age = 18
    cc.log('I am %s and %s years old', name, age)
    cc.log('I am ', name, ' and ', age, ' years old')

  it 'setColor', ->
    cc.log.setColor('red');
    cc.log('This is msg with color-red');
    cc.log.resetAll()

  it 'setOddColor', ->
    cc.log.setOddColor('red');
    cc.log('This is msg with color-red');
    cc.log('This is msg with color-white');
    cc.log.resetAll()

  it 'setEvenColor', ->
    cc.log.setEvenColor('blue');
    cc.log('This is msg with color-white');
    cc.log('This is msg with color-blue');
    cc.log.resetAll()

  it 'setStyle', ->
    cc.log.setStyle('bold', 'underline');
    cc.log('This is Log with underline');
    cc.log.resetAll()

  it 'setLine', ->
    cc.log.setLine(40);
    cc.log('This is Log with line after');
    cc.log.resetAll()

  it 'showMe', ->
    cc.log.showMe();
    cc.log('This is log with stack-info');
    cc.log.resetAll()

  it 'head', ->
    cc.log.head('I am head');
    cc.log('This is log with head');

    index = 0
    cc.log.head(() ->
      date = new Date();
      return '**Index:' + (++index) + ' - ' + date + '**';
    );
    cc.log('This is log1 with head');
    cc.log('This is log2 with head');

    cc.log.head(null)
    cc.log('this is log without head')
    cc.log.resetAll()

  it 'createLog', ->
    cc.createLog('err').setColor('red');
    cc.err('This is log for error');
    cc.createLog('info').setColor('cyan');
    cc.info('This is log for info');

  it 'line', ->
    cc.line();
    cc.line(40, false);

  it 'accept', ->
    cc.accept('info', 'err');
    cc.log('This is Log');
    cc.info('This is Info');
    cc.err('This is Err');
    cc.accept();
    cc.log('This is Log2');
    cc.info('This is Info2');
    cc.err('This is Err2');

  it 'showWhere', ->
    cc.showWhere();
return