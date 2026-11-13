export const colors = {
  forest: '#06201B',
  forestDeep: '#041713',
  emerald: '#278672',
  emeraldDeep: '#1B6255',
  emeraldInk: '#123F37',
  turquoise: '#4BC2AC',
  turquoiseSoft: '#A8E4D6',
  porcelain: '#F4F6F2',
  porcelainDeep: '#EBEEE7',
  sand: '#E4E8DF',
  stone: '#C9D0C6',
  ink: '#0E1C18',
  charcoal: '#19231F',
  muted: '#5C6B64',
  white: '#FFFFFF',
  line: 'rgba(14, 28, 24, 0.12)',
  lineLight: 'rgba(244, 246, 242, 0.16)',
};

export const fonts = {
  sans: 'var(--font-manrope), "Manrope", "Helvetica Neue", Arial, sans-serif',
  mono: '"SFMono-Regular", "Roboto Mono", Menlo, monospace',
};

export const bp = {
  xs: '480px',
  sm: '640px',
  md: '820px',
  lg: '1080px',
  xl: '1280px',
  xxl: '1560px',
};

export const mq = {
  xs: `@media (min-width: ${bp.xs})`,
  sm: `@media (min-width: ${bp.sm})`,
  md: `@media (min-width: ${bp.md})`,
  lg: `@media (min-width: ${bp.lg})`,
  xl: `@media (min-width: ${bp.xl})`,
  xxl: `@media (min-width: ${bp.xxl})`,
  hover: '@media (hover: hover) and (pointer: fine)',
  reduce: '@media (prefers-reduced-motion: reduce)',
};

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  soft: [0.22, 1, 0.36, 1],
};

export const layout = {
  max: '1560px',
  gutter: 'clamp(20px, 4vw, 64px)',
  header: '84px',
};

export const theme = {
  colors,
  fonts,
  bp,
  mq,
  ease,
  layout,
};
