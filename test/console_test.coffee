do ->
describe 'Console', ->
  it.only 'log', ->
    cconsole.log('1', undefined);
    cconsole.log();
    cconsole.log('2', {a: 1});
    cconsole.log(-> return 'abc');
    cconsole.log(['caro'], NaN);

  it 'error', ->
    cconsole.log2(undefined);
    cconsole.log2('1', undefined);
    cconsole.log2('2', {});

  it 'log3', ->
    cconsole.log3(undefined, 'test');
    cconsole.log3([]);
    cconsole.log3('2', null);
return