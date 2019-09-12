import { Selector } from 'testcafe';

const developerNameInput = Selector('#developer-name');

fixture `TestCafe Example Page`   
  .page `https://devexpress.github.io/testcafe/example/`;

test('Perform search and validate expected result found', async t => {

  const developerNameText = 'TestCafe Woot';
  
  await t
    .setNativeDialogHandler(() => true)
    .typeText(Selector('#developer-name'), developerNameText)

  await t
    .expect(developerNameInput.value).eql(developerNameText)
        .click(Selector('#populate'));
   
    const history = await t.getNativeDialogHistory();
    await t
        .expect(history[0].type).eql('confirm')
        .expect(history[0].text).eql('Reset information before proceeding?')
        .expect(Selector('#developer-name').value).notEql(developerNameText)
      })
