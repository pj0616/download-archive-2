import { createGlobalStyle, keyframes } from 'styled-components'
import { reset } from 'styled-reset'

export const fontFamily = 'Circular, Helvetica, sans-serif'

export const colors = {
  dark: '#000000',
  darkText: '#000000',
  light: '#ffffff',
  lightText: '#ffffff',
  lightGray: '#F5F6F6',
  linkLight: '#b927e9',
  linkDark: '#9800c9',
  purple: '#3E164C',
  lightPurple: '#F8ECFC',
  purple500: '#b927e9',
  purple600: '#9800c9',
}

export const breakpointNr = {
  small: 640,
  medium: 1024,
  large: 1440,
  xlarge: 1920,
}

export const breakpoints = {
  small: '(min-width: 640px)',
  smallDown: '(max-width: 640px)',
  medium: '(min-width: 1024px)',
  large: '(min-width: 1366px)',
  xlarge: '(min-width: 1920px)',
}

export const durations = {
  fast: '120ms',
  normal: '220ms',
  slow: '320ms',
}

export const easings = {
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
}

export const baseFontsize = '16px'

export const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    --scrollbar-width: 0;
    --nprogress-color: ${colors.dark};
  }

  html {
    box-sizing: border-box;
    font-size: ${baseFontsize};
    font-family: ${fontFamily};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  b,
  strong {
    font-weight: 700;
  }

  i,
  em {
    font-style: italic;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    max-width: 100%;
  }

  ::selection {
    color: white;
    background-color: ${colors.dark};
  }

  :focus {
    outline: dotted 1px ${colors.dark};
  }

  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--nprogress-color);
  }

  #nprogress .peg {
    position: absolute;
    right: 0;
    display: block;
    width: 100px;
    height: 100%;
    opacity: 1.0;
    transform: rotate(3deg) translate(0, -4px);
  }

  @-webkit-keyframes move {
    from {
      background-position: 2px 19px;
    }
    to {
      background-position: 500px 19px;
    }
  }
  
  @keyframes move {
    from {
      background-position: 2px 19px;
    }
    to {
      background-position: 500px 19px;
    }
  }
  @-webkit-keyframes color {
    0%   {color: red;}
    25%  {color: yellow;}
    50%  {color: green;}
    75% {color: blue;}
    100% {color: purple;}
  }

  @keyframes color {
    0%   {color: red;}
    25%  {color: yellow;}
    50%  {color: green;}
    75% {color: blue;}
    100% {color: purple;}
  }

  .dark {
    background-color: ${colors.dark};
    transition: all 0.6s ease;
  }
  
  .light {
    transition: all 0.6s ease;
  }

`

export const visuallyhidden = () => {
  return {
    position: 'absolute',
    zIndex: 9999,
    left: 0,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    border: 0,
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
  }
}

/**
 * Mixins/helpers
 */
export function mediaQuery(breakpoint) {
  return `@media screen and ${breakpoint}`
}

export function fluidRange({ min, max, viewportMin = 320, viewportMax = 728 }) {
  return `calc(${min}px + (${max} - ${min}) * ((100vw - ${viewportMin}px) / ${viewportMax -
    viewportMin}))`
}

export function ratio({ x = 16, y = 9 } = {}) {
  return {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    '&::before': {
      content: "''",
      display: 'inline-block',
      height: 0,
      paddingBottom: `${(y / x) * 100}%`,
    },
  }
}

export function cover() {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}

export function vw(n) {
  return `${n / 15.2}vw`
}

/**
 * Animations
 */
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const animations = {
  fadeIn,
}

/**
 * This is a modified version of styled-system.
 * MIT License: https://github.com/jxnblk/styled-system/blob/master/LICENSE.md
 */

// Utils
function noop(i) {
  return i
}

function isNumeric(num) {
  return !Number.isNaN(Number(num))
}

function merge(a, b) {
  return {
    ...a,
    ...b,
    ...Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === 'object'
              ? merge(a[key], b[key])
              : b[key],
        }),
      {},
    ),
  }
}

const mediaQueries = [null, ...Object.values(breakpoints).map(mediaQuery)]

export function getStyleDeclaration(prop, value, transformValue = noop) {
  if (value == null) {
    return null
  }

  return {
    [prop]: transformValue(value),
  }
}

export function getResponsiveStyle(cssProperty, values, transformValue) {
  return mediaQueries.reduce((acc, media, i) => {
    const rule = getStyleDeclaration(cssProperty, values[i], transformValue)

    if (!media) {
      return rule || {}
    }

    if (rule) {
      acc[media] = rule
    }

    return acc
  }, {})
}

function createStyle({ prop, cssProperty = prop, transformValue }) {
  function fn(props) {
    const value = props[prop]
    if (value == null) {
      return null
    }

    if (!Array.isArray(value)) {
      return getStyleDeclaration(cssProperty, value, transformValue)
    }

    return getResponsiveStyle(cssProperty, value, transformValue)
  }

  return fn
}

// Space
const REG = /^[mp][trblxy]?$/
const properties = {
  m: 'margin',
  p: 'padding',
}
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
}

function getSpaceProperties(key) {
  const [a, b] = key.split('')
  const property = properties[a]
  const direction = directions[b] || ''
  return Array.isArray(direction)
    ? direction.map(dir => property + dir)
    : [property + direction]
}

function getSpaceValue(n, i) {
  if (!isNumeric(n)) {
    return n
  }

  const scale = i === 0 ? 3.75 : 15.2
  const value = (Number(n) * 8) / scale

  return value !== 0 ? `${value}vw` : value
}

export function space(props) {
  const keys = Object.keys(props)
    .filter(key => REG.test(key))
    .sort()

  return keys
    .map(key => {
      const value = props[key]
      const cssProperties = getSpaceProperties(key)

      const style = (n, i) =>
        n != null
          ? cssProperties.reduce(
              (a, prop) => ({
                ...a,
                [prop]: getSpaceValue(n, i),
              }),
              {},
            )
          : null

      if (!Array.isArray(value)) {
        return style(value)
      }

      return value.reduce((acc, val, i) => {
        const media = mediaQueries[i]
        const rule = style(val, i)

        if (!media) {
          return rule || {}
        }

        if (rule) {
          acc[media] = rule
        }

        return acc
      }, {})
    })
    .reduce(merge, {})
}

export const bgColor = createStyle({
  prop: 'bg',
  cssProperty: 'backgroundColor',
})

export const textColor = createStyle({
  prop: 'textColor',
  cssProperty: 'color',
})

export const textAlign = createStyle({
  prop: 'textAlign',
})

export const alignItems = createStyle({
  prop: 'alignItems',
})

export const alignContent = createStyle({
  prop: 'alignContent',
})

export const justifyItems = createStyle({
  prop: 'justifyItems',
})

export const justifyContent = createStyle({
  prop: 'justifyContent',
})

export const flexWrap = createStyle({
  prop: 'flexWrap',
})

export const flexBasis = createStyle({
  prop: 'flexBasis',
})

export const flexDirection = createStyle({
  prop: 'flexDirection',
})

export const justifySelf = createStyle({
  prop: 'justifySelf',
})

export const alignSelf = createStyle({
  prop: 'alignSelf',
})

export const order = createStyle({
  prop: 'order',
})
