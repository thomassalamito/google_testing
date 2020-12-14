import {by, element} from 'protractor';

export class TestPage{
  clickPopupWindow() {
    return element(by.id('#introAgreeButton')).click();
  }
}