/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'odp-bg': '#282c34',
        'odp-dark-bg': '#21252b',
        'odp-light-bg': '#363b46',
        'odp-light2-bg': '#464b56',
        'odp-fg': '#cccccc',
        'odp-strong-fg': '#d7dae0',
        'odp-editor-fg': '#abb2bf',
        'odp-grey': '#6e7177',
        'odp-purple': '#c678dd',
        'odp-cyan': '#56b6c2',
        'odp-blue': '#61afef'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      }
    },
  },
  plugins: [],
}
