import {ExpectedConditions, browser, by, element} from 'protractor';
import {TestPage} from '../pages/google/google.po';

export class my_test {
  public run() {
    describe(`toto`,() => {

      beforeAll(async () => {
        await browser.driver.get("http://www.google.com");
        await browser.driver.sleep(5000);
        await browser.manage().deleteCookie('CONSENT');
        await browser.manage().addCookie({name:'CONSENT', value : 'YES+FR.fr+V10+BX'});
        await browser.driver.get("http://www.google.com");
        await browser.driver.sleep(5000);
      });

      it('should test access to the startup page', async () => {
        expect(await browser.driver.getCurrentUrl()).toContain('google');
      })

      it('should fill google test page', async () => {
        await browser.driver.findElement(by.css("#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input")).sendKeys('symphony sophia antipolis');
        await browser.sleep(5000);
        await browser.driver.findElement(by.css("#tsf > div:nth-child(2) > div.A8SBwf.emcav > div.UUbT9 > div.aajZCb > div.tfB0Bf > center > input.RNmpXc")).click();
        await browser.sleep(10000);
      })
    });
  }
}

new my_test().run();
