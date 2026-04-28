const { I } = inject();

module.exports = {
  fields: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
  },
  buttons: {
    login: '[data-test="login-button"]',
  },
  error: '[data-test="error"]',

  login(username, password) {
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.login);
  },
};