'use client';
import styled from 'styled-components';
import Image from 'next/image';
import Eyebrow from './Eyebrow';
import SplitLines from './SplitLines';
import Breadcrumbs from './Breadcrumbs';
import { colors, mq } from '@/lib/theme';

const Hero = styled.header`
  position: relative;
  isolation: isolate;
  background: ${colors.forest};
  color: ${colors.porcelain};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: ${(p) => (p.$compact ? '62vh' : '84vh')};
  padding-top: calc(var(--header-h) + clamp(48px, 8vh, 96px));
  padding-bottom: clamp(40px, 7vh, 76px);
`;

const Media = styled.div`
  position: absolute;
  inset: 0;
  z-index: -3;
  img { object-fit: cover; object-position: ${(p) => p.$position || 'center'}; }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(180deg, rgba(4, 23, 19, 0.78) 0%, rgba(4, 23, 19, 0.34) 38%, rgba(4, 23, 19, 0.9) 100%),
    linear-gradient(90deg, rgba(4, 23, 19, 0.72) 0%, rgba(4, 23, 19, 0.12) 68%);
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.22;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  gap: 40px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) 280px;
    align-items: end;
    gap: 72px;
  }
`;

const Top = styled.div`
  margin-bottom: clamp(48px, 10vh, 110px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Spine = styled.span`
  display: none;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.45);

  ${mq.md} { display: inline-flex; align-items: center; gap: 10px; }
  &::before {
    content: '';
    width: 34px;
    height: 1px;
    background: currentColor;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.6rem, 6.4vw, 6.6rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
  font-weight: 550;
  text-wrap: balance;
  max-width: 15ch;

  em {
    font-style: normal;
    color: ${colors.turquoiseSoft};
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-top: clamp(24px, 4vh, 44px);
`;

const Lead = styled.p`
  max-width: 54ch;
  font-size: clamp(1rem, 1.3vw, 1.12rem);
  line-height: 1.65;
  color: rgba(244, 246, 242, 0.76);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Side = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-top: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);

  ${mq.lg} {
    border-top: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.18);
    padding: 4px 0 4px 26px;
  }
`;

const Index = styled.span`
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${colors.turquoise};
`;

const MetaList = styled.dl`
  display: grid;
  gap: 14px;

  div { display: grid; gap: 2px; }
  dt {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.42);
  }
  dd {
    font-size: 13px;
    line-height: 1.5;
    color: rgba(244, 246, 242, 0.86);
  }
`;

const Rule = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(75, 194, 172, 0.4), transparent);
`;

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = '',
  position = 'center',
  index,
  meta = [],
  children,
  breadcrumbs,
  compact = false,
}) {
  return (
    <Hero $compact={compact}>
      {image ? (
        <Media $position={position}>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" quality={85} />
        </Media>
      ) : null}
      <Scrim />
      <Grain />
      <div className="container">
        <Top>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : <span />}
          <Spine>RaiseRaise Elevators</Spine>
        </Top>
        <Grid>
          <div>
            {eyebrow && <Eyebrow tone="dark" style={{ marginBottom: 22 }}>{eyebrow}</Eyebrow>}
            <Title>
              <SplitLines as="span" text={title} />
            </Title>
            <Bottom>
              {lead && <Lead>{lead}</Lead>}
              {children && <Actions>{children}</Actions>}
            </Bottom>
          </div>
          {(index || meta.length > 0) && (
            <Side>
              {index && <Index>{index}</Index>}
              {meta.length > 0 && (
                <MetaList>
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </MetaList>
              )}
            </Side>
          )}
        </Grid>
      </div>
      <Rule />
    </Hero>
  );
}
