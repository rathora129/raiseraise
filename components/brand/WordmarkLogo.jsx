'use client';
import styled from 'styled-components';
import Link from 'next/link';
import Mark from './Mark';
import { colors, mq } from '@/lib/theme';

const Lockup = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  color: ${(p) => (p.$dark ? colors.white : colors.ink)};
`;

const Wordmark = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1px;
  line-height: 1;
`;

const Name = styled.span`
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.045em;
  color: ${(p) => (p.$dark ? colors.white : colors.ink)};
  transition: color 300ms ease;
`;

const Sub = styled.span`
  font-size: 7.5px;
  font-weight: 600;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: ${(p) => (p.$dark ? colors.turquoiseSoft : colors.emerald)};
  padding-left: 1px;

  ${mq.sm} {
    font-size: 8px;
  }
`;

export default function WordmarkLogo({ dark = false, href = '/', compact = false }) {
  return (
    <Lockup href={href} $dark={dark} aria-label="RaiseRaise Elevators — home">
      <Mark size={compact ? 30 : 36} />
      <Wordmark>
        <Name $dark={dark}>RaiseRaise</Name>
        <Sub $dark={dark}>Elevators</Sub>
      </Wordmark>
    </Lockup>
  );
}
