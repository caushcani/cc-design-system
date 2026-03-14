# cc-button

A versatile button component supporting multiple visual variants and sizes.

## Usage

```html
<!-- Solid (default) -->
<cc-button>Click me</cc-button>

<!-- Outline -->
<cc-button variant="outline">Click me</cc-button>

<!-- Ghost -->
<cc-button variant="ghost">Click me</cc-button>

<!-- Sizes -->
<cc-button size="sm">Small</cc-button>
<cc-button size="md">Medium</cc-button>
<cc-button size="lg">Large</cc-button>

<!-- Disabled -->
<cc-button disabled>Disabled</cc-button>

<!-- With prefix slot -->
<cc-button>
  <cc-icon slot="prefix" name="search" />
  Search
</cc-button>
```

## Accessibility

- Renders a native `<button>` element internally — inherits all keyboard and AT support
- `aria-disabled` is set when `disabled` is true
- Focus ring via `:focus-visible` using `--cc-color-focus` token
- Keyboard: `Enter` / `Space` activate the button (native behavior)
- Consumer responsibility: provide meaningful label text or `aria-label`

## Properties

| Prop       | Type                              | Default    | Description          |
| ---------- | --------------------------------- | ---------- | -------------------- |
| `variant`  | `'solid' \| 'outline' \| 'ghost'` | `'solid'`  | Visual style         |
| `size`     | `'sm' \| 'md' \| 'lg'`            | `'md'`     | Button size          |
| `disabled` | `boolean`                         | `false`    | Disables interaction |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type     |

## Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| (default) | Button label text                    |
| `prefix`  | Content before the label (e.g. icon) |
| `suffix`  | Content after the label (e.g. icon)  |

## CSS Custom Properties

| Property                  | Description                      |
| ------------------------- | -------------------------------- |
| `--cc-color-primary-500`  | Primary background (solid)       |
| `--cc-color-primary-600`  | Hover background (solid)         |
| `--cc-color-primary-700`  | Active background (solid)        |
| `--cc-color-primary-50`   | Hover background (ghost/outline) |
| `--cc-color-white`        | Text color on solid variant      |
| `--cc-color-focus`        | Focus ring color                 |
| `--cc-spacing-xs`         | Gap between slots                |
| `--cc-spacing-sm`         | Padding (sm size)                |
| `--cc-spacing-md`         | Padding (md size)                |
| `--cc-spacing-lg`         | Padding (lg size)                |
| `--cc-radius-md`          | Border radius                    |
| `--cc-font-family-base`   | Font family                      |
| `--cc-font-weight-medium` | Font weight                      |
| `--cc-font-size-sm`       | Font size (sm size)              |
| `--cc-font-size-md`       | Font size (md size)              |
| `--cc-font-size-lg`       | Font size (lg size)              |
