import { t } from 'testcafe';
import { ThankYouPage } from '../../../utils/page-objects/thank-you-page';
import {
  getPageUrl,
  getTextFromElement
} from '../../../utils/page-objects/common';

fixture`Example Page - UI Smoke tests`
  .page(ThankYouPage.url);

test('Validate all expected fields are displayed', async t => {
  await t.expect(getPageUrl()).eql('https://devexpress.github.io/testcafe/example/thank-you.html');
  // Validate that the H1 is present and it's text is expected.
  await ThankYouPage.validateThankYou(t)

  // Validate heading text and TestCafe link are displayed with expected data.
  await t
    .expect(await getTextFromElement(ThankYouPage.headingText.selector)).eql(ThankYouPage.headingText.text)
    .expect(await ThankYouPage.testcafeLink.selector.getAttribute('href'))
      .contains(ThankYouPage.testcafeLink.href)
})  