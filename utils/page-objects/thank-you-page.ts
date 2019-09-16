import { Selector } from 'testcafe';

export namespace ThankYouPage {
  export const h1 = {
    selector: Selector('#article-header'),
    defaultText: 'Thank you!',
    thankYouTextPart1: 'Thank you, ',
    thankYouTextPart2: '!'
  };

  export async function validateThankYou(t, name?: string) {
    const thankYouToCheck =
      name ? h1.thankYouTextPart1 + name + h1.thankYouTextPart2 : h1.defaultText 
    await t.expect(await h1.selector.textContent).eql(thankYouToCheck);
  }

  export const headingText = {
    selector: Selector('p'),
    text: 'To learn more about TestCafe, please visit:\n        devexpress.github.io/testcafe',
  };

  export const testcafeLink = {
    selector: Selector('a'), 
    href: '/testcafe'
  }
  export const url = 'https://devexpress.github.io/testcafe/example/thank-you.html'; 
}
  // await t.expect(await articleHeaderElement.textContent).eql('Thank you, ' + defaultDeveloperNameText + '!');
  // await t.expect(await Selector('p').textContent)
  //   .eql('To learn more about TestCafe, please visit:\n        devexpress.github.io/testcafe');
  // await t.expect(await Selector('a').getAttribute('href')).contains('/testcafe');