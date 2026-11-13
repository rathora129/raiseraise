'use client';
import styled from 'styled-components';
import { colors, mq } from '@/lib/theme';

const Track = styled.div`
  overflow: hidden;
  border-top: 1px solid ${(p) => (p.$tone === 'dark' ? colors.lineLight : colors.line)};
  border-bottom: 1px solid ${(p) => (p.$tone === 'dark' ? colors.lineLight : colors.line)};
  padding: 14px 0;
  background: ${(p) => (p.$tone === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent')};
  user-select: none;
`;

const Inner = styled.div`
  display: flex;
  width: max-content;
  animation: marquee ${(p) => p.$speed || 38}s linear infinite;

  @keyframes marquee {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }

  ${mq.reduce} { animation: none; }

  ${mq.hover} {
    ${Track}:hover & { animation-play-state: paused; }
  }
`;

const Group = styled.ul`
  display: flex;
  align-items: center;
  gap: clamp(24px, 3.6vw, 56px);
  padding-right: clamp(24px, 3.6vw, 56px);
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: clamp(24px, 3.6vw, 56px);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${(p) => (p.$tone === 'dark' ? 'rgba(244,246,242,0.72)' : colors.muted)};

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 3.5px solid transparent;
    border-right: 3.5px solid transparent;
    border-bottom: 6px solid ${(p) => (p.$tone === 'dark' ? colors.turquoise : colors.emerald)};
    opacity: 0.8;
  }
`;

export default function Marquee({ items, tone = 'light', speed = 38 }) {
  const group = (
    <Group $tone={tone} aria-hidden="true">
      {items.map((item) => (
        <Item key={item} $tone={tone}>{item}</Item>
      ))}
    </Group>
  );

  return (
    <Track $tone={tone}>
      <Inner $speed={speed}>
        {group}
        {group}
      </Inner>
    </Track>
  );
}
