import { Selector } from 'testcafe';

fixture `Google Home Page`
  .page `https://www.google.com/webhp`;

test('My first test', async t => {
    // Test code
    await t
      .expect(5).eql(2);
});