# Project Instructions

## BDD workflow for portfolio features

For user-facing portfolio artifacts, HTML prototypes, interactive case pages, and shipment-card behavior, use the BDD workflow by default.

Before implementing a feature, translate the requested behavior into a Gherkin scenario in `features/*.feature`, unless the user explicitly asks to skip BDD for that task.

Use this structure:

```gherkin
# language: ru
@draft
Функция: Название функции
  Как [роль]
  Я хочу [возможность]
  Чтобы [польза]

  Сценарий: Проверяемое поведение
    Дано [исходное состояние]
    Когда [действие]
    Тогда [ожидаемый результат]
    И [дополнительный проверяемый результат]
```

Rules:

- Keep each scenario focused on one behavior.
- Use `@draft` for new scenarios that are not implemented yet.
- Remove `@draft` only when the implementation and automated checks are ready.
- Run `npm run bdd` before finishing implementation work.
- Use `npm run bdd:draft` to inspect unfinished BDD tasks.
- Do not include private company data, internal links, document IDs, credentials, supplier names, or local paths in public scenarios or prototypes.

Reference:

- `docs/bdd-workflow.md`
