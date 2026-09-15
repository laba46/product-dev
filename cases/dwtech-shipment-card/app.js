(function () {
  const checks = Array.from(document.querySelectorAll('[data-document-check]'));
  const foundCount = document.querySelector('[data-found-count]');
  const completenessState = document.querySelector('[data-completeness-state]');
  const sendButton = document.querySelector('[data-send-agent-request]');
  const nextAction = document.querySelector('[data-next-action]');

  function updateCompleteness() {
    const completed = checks.filter((check) => check.checked).length;
    const isReady = completed === checks.length;

    foundCount.textContent = completed;
    completenessState.textContent = isReady ? 'Полный комплект' : 'Неполный комплект';
    completenessState.classList.toggle('warning', !isReady);
    completenessState.classList.toggle('ready', isReady);
    sendButton.disabled = !isReady;
    nextAction.textContent = isReady
      ? 'Отправить комплект агенту для расчета стоимости доставки.'
      : 'Запросить недостающие данные у инициатора поставки.';
  }

  checks.forEach((check) => {
    check.addEventListener('change', updateCompleteness);
  });

  updateCompleteness();
})();
