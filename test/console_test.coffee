do ->
describe 'Console', ->
  it 'log', ->
    cc.log('1', undefined);
    cc.log();
    cc.log('2', {a: 1});
    cc.log(-> return 'abc');

  it 'setStyle', ->
    cc.log.setOddColor('red').setEvenColor('magenta').setStyle('bold', 'underline')
    cc.log(['caro'], NaN);
    cc.log(['caro'], NaN);

  it 'createLog', ->
    cc.createLog('err').setOddColor('red').setEvenColor('magenta')
    cc.err('This is Log For Error')
return