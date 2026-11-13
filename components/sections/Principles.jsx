'use client';
import styled from 'styled-components';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import SplitLines from '@/components/ui/SplitLines';
import { products, services, industries, processSteps } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background:
    radial-gradient(80% 90% at 90% 10%, rgba(75, 194, 172, 0.1), transparent 60%),
    ${colors.forest};
  color: ${colors.porcelain};
  padding: clamp(72px, 9vw, 128px) 0;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  gap: 42px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 84px;
    align-items: start;
  }
`;

const Left = styled.div`
  display: grid;
  gap: 26px;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 4.4vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  font-weight: 550;
  max-width: 13ch;

  em { font-style: normal; color: ${colors.turquoiseSoft}; }
`;

const Lead = styled.p`
  font-size: clamp(0.98rem, 1.2vw, 1.08rem);
  line-height: 1.68;
  color: rgba(244, 246, 242, 0.66);
  max-width: 46ch;
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 4.2;
  overflow: hidden;
  margin-top: 8px;

  img { object-fit: cover; }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0.12), rgba(4, 23, 19, 0.62));
  }
`;

const MediaNote = styled.span`
  position: absolute;
  left: 14px;
  bottom: 14px;
  z-index: 2;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.68);
`;

const Right = styled.div`
  display: grid;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 18px;
  padding: 26px 0;
  border-top: 1px solid rgba(244, 246, 242, 0.14);

  &:last-of-type { border-bottom: 1px solid rgba(244, 246, 242, 0.14); }
`;

const Num = styled.span`
  font-size: 10px;
  letter-spacing: 0.18em;
  color: ${colors.turquoise};
  padding-top: 5px;
  font-variant-numeric: tabular-nums;
`;

const ItemTitle = styled.h3`
  font-size: clamp(1.16rem, 1.6vw, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const ItemText = styled.p`
  margin-top: 7px;
  font-size: 13.5px;
  line-height: 1.68;
  color: rgba(244, 246, 242, 0.6);
  max-width: 48ch;
`;

const Band = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-top: clamp(44px, 6vw, 72px);
  background: rgba(244, 246, 242, 0.14);
  border: 1px solid rgba(244, 246, 242, 0.14);

  ${mq.md} { grid-template-columns: repeat(4, 1fr); }
`;

const Stat = styled.div`
  background: ${colors.forest};
  padding: 22px 20px;
  display: grid;
  gap: 4px;

  dt {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.42);
  }
  dd {
    font-size: clamp(1.7rem, 3vw, 2.4rem);
    font-weight: 250;
    letter-spacing: -0.04em;
    color: ${colors.porcelain};
    font-variant-numeric: tabular-nums;
  }
`;

const POINTS = [
  {
    title: 'Safety before schedule',
    text: 'Clearances, load limits and safety circuits are planned from the first survey — not adjusted after installation.',
  },
  {
    title: 'One accountable team',
    text: 'The people who plan your lift stay close through installation, handover and service, so responsibility never gets handed off.',
  },
  {
    title: 'Documentation you keep',
    text: 'Drawings, commissioning notes and service records are prepared for the building, not lost in a project folder.',
  },
  {
    title: 'Finish with restraint',
    text: 'Materials are chosen for how they wear over years of use — not only for how they look on day one.',
  },
];

export default function Principles() {
  return (
    <Section>
      <div className="container">
        <Grid>
          <Left>
            <Eyebrow tone="dark">Why RaiseRaise</Eyebrow>
            <Title>
              <SplitLines as="span" text={'The standard is in\nthe <em>details.</em>'} />
            </Title>
            <Lead>
              A lift is judged every day — by the ride, the door, the finish and the person
              who answers when something stops working. Those are the details we plan for.
            </Lead>
            <Media>
              <Image
                src="/images/details/control-panel.jpg"
                alt="Concept render of a brushed metal elevator control panel"
                fill
                sizes="(max-width: 1020px) 100vw, 42vw"
                quality={82}
              />
              <MediaNote>Concept study — control interface</MediaNote>
            </Media>
          </Left>

          <Right>
            {POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05} y={18}>
                <Item>
                  <Num>{String(index + 1).padStart(2, '0')}</Num>
                  <div>
                    <ItemTitle>{point.title}</ItemTitle>
                    <ItemText>{point.text}</ItemText>
                  </div>
                </Item>
              </Reveal>
            ))}
          </Right>
        </Grid>

        <Band>
          <Stat>
            <dt>Product ranges</dt>
            <dd>{products.length}</dd>
          </Stat>
          <Stat>
            <dt>Delivery stages</dt>
            <dd>{processSteps.length}</dd>
          </Stat>
          <Stat>
            <dt>Service disciplines</dt>
            <dd>{services.length}</dd>
          </Stat>
          <Stat>
            <dt>Sectors served</dt>
            <dd>{industries.length}</dd>
          </Stat>
        </Band>
      </div>
    </Section>
  );
}
