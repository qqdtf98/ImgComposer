export const StyleSheet = `
html {
  font-family: $ui-font;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  @include auto-text-color;
  @include auto-bg-color;
}

button {
  border: none;
  background: none;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.box {
  background-color: black;
  border-radius: 8px;
}

.box.red {
  background-color: red;
}

.box .title {
  font-size: 30px;
  font-weight: 700;
}
`
