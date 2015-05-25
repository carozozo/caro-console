do ->
describe.skip 'Console', ->
  it 'log', ->
    cconsole.log('1', undefined);
    cconsole.log();
    cconsole.log('2', {a: 1});
    cconsole.log(->);

  it 'log2', ->
    cconsole.log2(undefined);
    cconsole.log2('1', undefined);
    cconsole.log2('2', {});

  it 'log3', ->
    cconsole.log3(undefined, 'test');
    cconsole.log3('1', undefined);
    cconsole.log3('2', null);
return