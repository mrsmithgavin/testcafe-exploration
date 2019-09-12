import { Selector } from 'testcafe';

const developerNameInput = Selector('#developer-name');

fixture `TestCafe Example Page`   
  .page `https://devexpress.github.io/testcafe/example/`;

test('Perform search and validate expected result found', async t => {

  const developerNameText = 'TestCafe Woot';

  // Verify Route

  // Check H1 and accompanying

  
  // Configure test to handle dialogs
  await t
    .setNativeDialogHandler(() => true)

  // Interact with developer-name input field
  await t
    .typeText(Selector('#developer-name'), developerNameText)
    .expect(developerNameInput.value).eql(developerNameText)
        .click(Selector('#populate'));
   
  // Deal with alert and perform some expectations on the contents
  const history = await t.getNativeDialogHistory();
  await t
      .expect(history[0].type).eql('confirm')
      .expect(history[0].text).eql('Reset information before proceeding?')
      .expect(Selector('#developer-name').value).notEql(developerNameText)
    })

  // Interact with checkboxes

  // Interact with radio buttons

  // Interact with drop down menu

  // Interact with slider

  // Interact with textarea

  // Interact with button

  // After submit, app will display confirmation page
  // - check route
  // - perform validations