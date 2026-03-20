# cc-alert

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                              | Type                                           | Default  |
| ------------- | ------------- | ---------------------------------------- | ---------------------------------------------- | -------- |
| `dismissible` | `dismissible` | Show a dismiss (×) button                | `boolean`                                      | `false`  |
| `heading`     | `heading`     | Bold title text displayed above the body | `string`                                       | `''`     |
| `hideIcon`    | `hide-icon`   | Hide the built-in icon                   | `boolean`                                      | `false`  |
| `variant`     | `variant`     | Visual variant                           | `"danger" \| "info" \| "success" \| "warning"` | `'info'` |

## Events

| Event       | Description                                | Type                |
| ----------- | ------------------------------------------ | ------------------- |
| `ccDismiss` | Emitted when the dismiss button is clicked | `CustomEvent<void>` |

## Slots

| Slot     | Description                           |
| -------- | ------------------------------------- |
|          | Alert body / description text         |
| `"icon"` | Custom icon (overrides built-in icon) |

---

_Built with [StencilJS](https://stenciljs.com/)_
