do ->
describe 'Console', ->
  it 'log', ->
    cc.log('1', undefined);
    cc.log(['d', 'e']);
    cc.log('2', {
      a: 1,
      b: ()->
        return null
      c: ['r']
    }).breakLine(true);
    cc.log('2', '').breakLine(40);
    cc.log(-> return 'abc');

  it 'setStyle', ->
    cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline')
    cc.log('This is msg with color-red');
    cc.log('This is msg with color-magenta');

  it 'createLog', ->
    cc.createLog('err').setOddColor('red').setEvenColor('magenta')
    cc.err('This is Log used for error')
    cc.err('This is Log used for error')

    cc.createLog('notice').setColor('cyan').setStyle('bold', 'underline')
    cc.notice('This is Log used for notice')
return