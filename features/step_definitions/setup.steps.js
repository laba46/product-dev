const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('BDD-контур установлен', function () {
  assert.ok(require.resolve('@cucumber/cucumber'));
});

When('я запускаю проверку сценариев', function () {
  this.checkStatus = 'running';
});

Then('Cucumber выполняет шаги', function () {
  assert.equal(this.checkStatus, 'running');
});
