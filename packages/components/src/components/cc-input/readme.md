# cc-input

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                                           | Type                                                                        | Default  |
| ------------- | ------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| `disabled`    | `disabled`    | Disables the input                                    | `boolean`                                                                   | `false`  |
| `error`       | `error`       | Error message — also puts the input in an error state | `string`                                                                    | `''`     |
| `hint`        | `hint`        | Helper text displayed below the input                 | `string`                                                                    | `''`     |
| `label`       | `label`       | Label displayed above the input                       | `string`                                                                    | `''`     |
| `name`        | `name`        | Associates input with a form element id               | `string`                                                                    | `''`     |
| `placeholder` | `placeholder` | Placeholder text                                      | `string`                                                                    | `''`     |
| `readonly`    | `readonly`    | Makes the input read-only                             | `boolean`                                                                   | `false`  |
| `required`    | `required`    | Marks the input as required                           | `boolean`                                                                   | `false`  |
| `size`        | `size`        | Size variant                                          | `"lg" \| "md" \| "sm"`                                                      | `'md'`   |
| `type`        | `type`        | Input type                                            | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'` |
| `value`       | `value`       | Bound value                                           | `string`                                                                    | `''`     |

## Events

| Event     | Description                                         | Type                  |
| --------- | --------------------------------------------------- | --------------------- |
| `ccBlur`  | Emitted when the input loses focus                  | `CustomEvent<void>`   |
| `ccFocus` | Emitted when the input gains focus                  | `CustomEvent<void>`   |
| `ccInput` | Emitted on every input event with the current value | `CustomEvent<string>` |

## Slots

| Slot       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `"prefix"` | Icon or content to render inside the input on the left  |
| `"suffix"` | Icon or content to render inside the input on the right |

---

_Built with [StencilJS](https://stenciljs.com/)_
