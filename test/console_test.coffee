do ->
describe 'Console', ->
  it 'log', ->
    cc.log('This is ', undefined);
    cc.log(['d', 'e']);
    cc.log('obj=', {
      a: 1,
      b: ()->
        return null
      c: ['r']
    });
    cc.log(-> return 'abc');

  it 'setStyle', ->
    cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline')
    cc.log('This is msg with color-red');
    cc.log('This is msg with color-magenta');

    cc.log.setBreakLine()
    cc.log('This is msg with break line (length 20)');
    cc.log.setBreakLine(40)
    cc.log('This is msg with break line (length 40)');

  it 'createLog', ->
    cc.createLog('err').setOddColor('red').setEvenColor('magenta')
    cc.err('This is Log used for error')
    cc.err('This is Log used for error')

    cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline')
    cc.notice('This is Log used for notice')
return