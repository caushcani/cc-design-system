# cc-checkbox

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute       | Description                                                     | Type      | Default |
| --------------- | --------------- | --------------------------------------------------------------- | --------- | ------- |
| `checked`       | `checked`       | Whether the checkbox is checked                                 | `boolean` | `false` |
| `disabled`      | `disabled`      | Disables the checkbox                                           | `boolean` | `false` |
| `error`         | `error`         | Error message — also puts the checkbox in an error state        | `string`  | `''`    |
| `hint`          | `hint`          | Helper text displayed below the checkbox                        | `string`  | `''`    |
| `indeterminate` | `indeterminate` | Indeterminate state — visually shows a dash, checked is ignored | `boolean` | `false` |
| `name`          | `name`          | Associates checkbox with a form                                 | `string`  | `''`    |
| `required`      | `required`      | Marks the checkbox as required                                  | `boolean` | `false` |
| `value`         | `value`         | Value submitted with the form                                   | `string`  | `''`    |

## Events

| Event      | Description                            | Type                   |
| ---------- | -------------------------------------- | ---------------------- |
| `ccChange` | Emitted when the checked state changes | `CustomEvent<boolean>` |

## Slots

| Slot | Description                 |
| ---- | --------------------------- |
|      | Label text for the checkbox |

---

_Built with [StencilJS](https://stenciljs.com/)_
