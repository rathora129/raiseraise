'use client';
import { createGlobalStyle } from 'styled-components';
import { colors, fonts, mq } from '@/lib/theme';

export const GlobalStyle = createGlobalStyle`
  :root {
    --forest: ${colors.forest};
    --forest-deep: ${colors.forestDeep};
    --emerald: ${colors.emerald};
    --emerald-deep: ${colors.emeraldDeep};
    --emerald-ink: ${colors.emeraldInk};
    --turquoise: ${colors.turquoise};
    --turquoise-soft: ${colors.turquoiseSoft};
    --porcelain: ${colors.porcelain};
    --porcelain-deep: ${colors.porcelainDeep};
    --sand: ${colors.sand};
    --ink: ${colors.ink};
    --charcoal: ${colors.charcoal};
    --muted: ${colors.muted};
    --line: ${colors.line};
    --line-light: ${colors.lineLight};
    --header-h: 84px;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    scroll-padding-top: 110px;
  }

  body {
    margin: 0;
    background: ${colors.porcelain};
    color: ${colors.ink};
    font-family: ${fonts.sans};
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body.is-locked { overflow: hidden; }

  h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd { margin: 0; }
  ul, ol { margin: 0; padding: 0; list-style: none; }
  img, video, canvas, svg { display: block; max-width: 100%; }
  img { height: auto; }
  button, input, textarea, select { font: inherit; color: inherit; }
  button { background: none; border: 0; padding: 0; cursor: pointer; }
  a { color: inherit; text-decoration: none; }

  ::selection { background: ${colors.turquoise}; color: ${colors.forest}; }

  :focus-visible {
    outline: 2px solid ${colors.turquoise};
    outline-offset: 3px;
    border-radius: 2px;
  }

  .container {
    width: 100%;
    max-width: 1560px;
    margin: 0 auto;
    padding-left: clamp(20px, 4vw, 64px);
    padding-right: clamp(20px, 4vw, 64px);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 2000;
    background: ${colors.forest};
    color: ${colors.porcelain};
    padding: 12px 18px;
    border-radius: 999px;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform: translateY(-160%);
    transition: transform 180ms ease;
  }
  .skip-link:focus { transform: translateY(0); }

  .no-js-hide { display: none; }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: ${colors.porcelainDeep}; }
  ::-webkit-scrollbar-thumb {
    background: ${colors.stone};
    border-radius: 99px;
    border: 2px solid ${colors.porcelainDeep};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${colors.emerald}; }

  ${mq.reduce} {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
