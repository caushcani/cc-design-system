# cc-select

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                                            | Type                   | Default |
| ------------- | ------------- | ------------------------------------------------------ | ---------------------- | ------- |
| `disabled`    | `disabled`    | Disables the select                                    | `boolean`              | `false` |
| `error`       | `error`       | Error message — also puts the select in an error state | `string`               | `''`    |
| `hint`        | `hint`        | Helper text displayed below the select                 | `string`               | `''`    |
| `label`       | `label`       | Label displayed above the select                       | `string`               | `''`    |
| `name`        | `name`        | Associates select with a form element id               | `string`               | `''`    |
| `placeholder` | `placeholder` | Placeholder option shown when no value is selected     | `string`               | `''`    |
| `required`    | `required`    | Marks the select as required                           | `boolean`              | `false` |
| `size`        | `size`        | Size variant                                           | `"lg" \| "md" \| "sm"` | `'md'`  |
| `value`       | `value`       | Bound value — must match one of the option values      | `string`               | `''`    |

## Events

| Event      | Description                             | Type                  |
| ---------- | --------------------------------------- | --------------------- |
| `ccBlur`   | Emitted when the select loses focus     | `CustomEvent<void>`   |
| `ccChange` | Emitted when the selected value changes | `CustomEvent<string>` |
| `ccFocus`  | Emitted when the select gains focus     | `CustomEvent<void>`   |

---

_Built with [StencilJS](https://stenciljs.com/)_
