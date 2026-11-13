'use client';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/lib/theme';
import { GlobalStyle } from './GlobalStyle';

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
