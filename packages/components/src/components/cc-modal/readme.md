# cc-modal

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                 | Type                             | Default |
| ---------------- | ----------------- | ------------------------------------------- | -------------------------------- | ------- |
| `heading`        | `heading`         | Heading text displayed in the modal header  | `string`                         | `''`    |
| `hideClose`      | `hide-close`      | Hides the close (×) button in the header    | `boolean`                        | `false` |
| `open`           | `open`            | Controls whether the modal is visible       | `boolean`                        | `false` |
| `size`           | `size`            | Size of the modal dialog                    | `"full" \| "lg" \| "md" \| "sm"` | `'md'`  |
| `staticBackdrop` | `static-backdrop` | Prevents closing when clicking the backdrop | `boolean`                        | `false` |

## Events

| Event     | Description                                  | Type                |
| --------- | -------------------------------------------- | ------------------- |
| `ccClose` | Emitted when the modal requests to be closed | `CustomEvent<void>` |

## Methods

### `hide() => Promise<void>`

Closes the modal

#### Returns

Type: `Promise<void>`

### `show() => Promise<void>`

Opens the modal

#### Returns

Type: `Promise<void>`

## Slots

| Slot       | Description                                       |
| ---------- | ------------------------------------------------- |
|            | Default slot for the modal body content           |
| `"footer"` | Action buttons or footer content                  |
| `"header"` | Custom header content (replaces the heading prop) |

---

_Built with [StencilJS](https://stenciljs.com/)_
