const assert = require('node:assert/strict');
const path = require('node:path');
const { Given, When, Then } = require('@cucumber/cucumber');
const { JSDOM } = require('jsdom');

async function openShipmentCard(world) {
  const pagePath = path.resolve(__dirname, '..', '..', 'cases', 'dwtech-shipment-card', 'index.html');

  world.dom = await JSDOM.fromFile(pagePath, {
    resources: 'usable',
    runScripts: 'dangerously',
  });

  if (world.dom.window.document.readyState !== 'complete') {
    await new Promise((resolve) => {
      world.dom.window.addEventListener('load', resolve, { once: true });
    });
  }

  world.document = world.dom.window.document;
}

function getSection(world, sectionName) {
  return world.document.querySelector(`[data-story-section="${sectionName}"]`);
}

function getText(world) {
  return world.document.body.textContent.replace(/\s+/g, ' ').trim();
}

Given('открыта MVP-карточка поставки {string}', async function (shipmentName) {
  this.shipmentName = shipmentName;
  await openShipmentCard(this);
});

When('пользователь смотрит блок комплектности', function () {
  this.currentSection = getSection(this, 'completeness');
});

When('пользователь смотрит workflow поставки', function () {
  this.currentSection = getSection(this, 'workflow');
});

When('пользователь смотрит структуру отгрузки', function () {
  this.currentSection = getSection(this, 'shipment-structure');
});

When('пользователь проверяет основу прототипа', function () {
  this.storySections = Array.from(this.document.querySelectorAll('[data-story-section]'));
});

Then('карточка показывает блок {string}', function (blockTitle) {
  assert.ok(this.currentSection, `Block "${blockTitle}" was not found`);
  assert.equal(this.currentSection.querySelector('[data-section-title]').textContent.trim(), blockTitle);
});

Then('пользователь видит обязательные документы для этапа', function () {
  const documents = Array.from(this.currentSection.querySelectorAll('[data-required-document]')).map((item) => item.textContent.trim());

  assert.deepEqual(documents, [
    'Инвойс',
    'Упаковочный лист',
    'Описание товара',
    'AWB / HAWB',
    'Драфт декларации',
  ]);
});

Then('система подсвечивает missing items', function () {
  const missingItems = Array.from(this.currentSection.querySelectorAll('[data-missing-item]')).map((item) => item.textContent.trim());

  assert.ok(missingItems.includes('AWB / HAWB'));
  assert.ok(missingItems.includes('Драфт декларации'));
});

Then('кнопка запроса агенту заблокирована, пока комплект неполный', function () {
  const button = this.currentSection.querySelector('[data-send-agent-request]');

  assert.ok(button);
  assert.equal(button.disabled, true);
});

Then('пользователь видит следующее действие по документам', function () {
  assert.match(this.currentSection.querySelector('[data-next-action]').textContent, /Запросить недостающие данные/);
});

Then('пользователь видит текущий этап поставки', function () {
  assert.match(this.currentSection.querySelector('[data-current-stage]').textContent, /Проверка комплекта/);
});

Then('пользователь видит, какие документы отправлены и получены', function () {
  const text = this.currentSection.textContent;

  assert.match(text, /Инвойс отправлен агенту/);
  assert.match(text, /Описание товара получено/);
});

Then('карточка явно показывает, на чьей стороне следующий шаг', function () {
  assert.match(this.currentSection.querySelector('[data-next-owner]').textContent, /Инициатор поставки/);
});

Then('пользователь видит activity log по обмену документами и запросами', function () {
  assert.ok(this.currentSection.querySelectorAll('[data-activity-item]').length >= 3);
});

Then('пользователь видит тип отгрузки {string}', function (shipmentType) {
  assert.equal(this.currentSection.querySelector('[data-shipment-type]').textContent.trim(), shipmentType);
});

Then('пользователь видит позиции, которые физически едут', function () {
  const rows = Array.from(this.currentSection.querySelectorAll('[data-physical-item]'));

  assert.ok(rows.length >= 3);
  assert.ok(rows.some((row) => /Контроллер доступа/.test(row.textContent)));
});

Then('пользователь видит остатки по частичным позициям', function () {
  assert.match(this.currentSection.querySelector('[data-partial-balance]').textContent, /остаток 40 шт/);
});

Then('карточка разделяет юридические роли посредника и фабрики', function () {
  const roles = this.currentSection.querySelector('[data-counterparty-roles]').textContent;

  assert.match(roles, /Плательщик/);
  assert.match(roles, /Фактический отправитель/);
});

Then('каждая MVP user story имеет связанный интерфейсный блок', function () {
  const storyIds = this.storySections.map((section) => section.dataset.storyId);

  assert.deepEqual(storyIds, ['US-01', 'US-02', 'US-03']);
});

Then('карточка показывает версию прототипа {string}', function (version) {
  assert.equal(this.document.querySelector('[data-prototype-version]').textContent.trim(), version);
});

Then('карточка не содержит приватных данных, внутренних ссылок или реальных поставщиков', function () {
  const text = getText(this);
  const bannedPatterns = [
    /C:\\/i,
    /Google Drive/i,
    /docs\.google/i,
    /token/i,
    /credential/i,
    /пароль/i,
    /поставщик\s+[А-ЯA-Z][а-яa-z]+/,
  ];

  bannedPatterns.forEach((pattern) => {
    assert.equal(pattern.test(text), false, `Private pattern leaked: ${pattern}`);
  });
});
