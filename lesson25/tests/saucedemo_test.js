Feature('SauceDemo UI');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

Scenario('Successful login', ({ I }) => {
  I.amOnPage('/');
  LoginPage.login('standard_user', 'secret_sauce');
  I.seeInCurrentUrl('/inventory');
});

Scenario('Login fails with invalid credentials', ({ I }) => {
  I.amOnPage('/');
  LoginPage.login('wrong', 'wrong');
  I.seeElement(LoginPage.error);
});

Scenario('Locked out user cannot login', ({ I }) => {
  I.amOnPage('/');
  LoginPage.login('locked_out_user', 'secret_sauce');
  I.seeElement(LoginPage.error);
});

Scenario('Inventory list is visible', ({ I }) => {
  I.amOnPage('/');
  LoginPage.login('standard_user', 'secret_sauce');
  I.seeElement(InventoryPage.items);
});

Scenario('Add item to cart', ({ I }) => {
  I.amOnPage('/');
  LoginPage.login('standard_user', 'secret_sauce');
  InventoryPage.addFirstItem();
  I.see('1', InventoryPage.cartBadge);
});