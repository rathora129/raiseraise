'use client';
import styled from 'styled-components';
import { colors, mq } from '@/lib/theme';

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${(p) => (p.$tone === 'dark' ? colors.turquoiseSoft : colors.emerald)};
  line-height: 1.4;
`;

const Rule = styled.span`
  display: inline-block;
  width: 26px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
  flex-shrink: 0;
`;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 7px solid currentColor;
  flex-shrink: 0;
  margin-right: -4px;
`;

export default function Eyebrow({ children, tone = 'light', mark = true, className, style }) {
  return (
    <Wrap $tone={tone} className={className} style={style}>
      {mark && <Triangle aria-hidden="true" />}
      <Rule aria-hidden="true" />
      <span>{children}</span>
    </Wrap>
  );
}
