'use client';
import styled from 'styled-components';
import Eyebrow from './Eyebrow';
import SplitLines from './SplitLines';
import { colors, mq } from '@/lib/theme';

const Wrap = styled.div`
  display: grid;
  gap: 22px;
  max-width: ${(p) => (p.$wide ? 'none' : '960px')};

  ${mq.lg} {
    grid-template-columns: ${(p) => (p.$split ? '1fr 1fr' : '1fr')};
    align-items: end;
    column-gap: 64px;
  }
`;

const Title = styled.h2`
  font-size: ${(p) => p.$size || 'clamp(2.1rem, 4.8vw, 4.3rem)'};
  line-height: 0.98;
  letter-spacing: -0.045em;
  font-weight: 600;
  color: ${(p) => (p.$tone === 'dark' ? colors.porcelain : colors.ink)};

  em {
    font-style: normal;
    color: ${(p) => (p.$tone === 'dark' ? colors.turquoiseSoft : colors.emerald)};
  }
`;

const Lead = styled.p`
  font-size: clamp(0.98rem, 1.25vw, 1.08rem);
  line-height: 1.65;
  color: ${(p) => (p.$tone === 'dark' ? 'rgba(244, 246, 242, 0.72)' : colors.muted)};
  max-width: 52ch;
`;

const Head = styled.div`
  display: grid;
  gap: 20px;
`;

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = 'light',
  split = false,
  wide = false,
  as = 'h2',
  delay = 0,
  size,
}) {
  return (
    <Wrap $wide={wide} $split={split}>
      <Head>
        {eyebrow && <Eyebrow tone={tone === 'dark' ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}
        <Title as={as} $tone={tone} $size={size}>
          <SplitLines as="span" text={title} delay={delay} />
        </Title>
      </Head>
      {lead && <Lead $tone={tone}>{lead}</Lead>}
    </Wrap>
  );
}
