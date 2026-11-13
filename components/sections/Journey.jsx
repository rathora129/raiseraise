'use client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import { processSteps } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  position: relative;
  background: ${colors.forestDeep};
  color: ${colors.porcelain};
  height: ${(p) => (p.$reduce ? 'auto' : '320vh')};
`;

const Sticky = styled.div`
  position: ${(p) => (p.$reduce ? 'relative' : 'sticky')};
  top: ${(p) => (p.$reduce ? 'auto' : '0')};
  min-height: ${(p) => (p.$reduce ? 'auto' : '100svh')};
  display: flex;
  align-items: center;
  padding: ${(p) => (p.$reduce ? '80px 0' : 'calc(var(--header-h) + 24px) 0 40px')};
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;
  width: 100%;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
    align-items: center;
    gap: 84px;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: 20px;
  align-content: center;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 4.6vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  font-weight: 550;
  max-width: 12ch;

  em { font-style: normal; color: ${colors.turquoiseSoft}; }
`;

const Stage = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 12px;
  padding-top: 22px;
  border-top: 1px solid rgba(244, 246, 242, 0.14);
  min-height: 190px;
`;

const FloorLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const FloorNumber = styled.span`
  font-size: clamp(3.4rem, 7vw, 5.6rem);
  font-weight: 200;
  line-height: 0.9;
  letter-spacing: -0.06em;
  color: ${colors.turquoise};
  font-variant-numeric: tabular-nums;
`;

const FloorLabel = styled.span`
  font-size: 9.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.46);
`;

const StageTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const StageText = styled.p`
  font-size: 14.5px;
  line-height: 1.7;
  color: rgba(244, 246, 242, 0.66);
  max-width: 46ch;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const Dot = styled.span`
  width: ${(p) => (p.$active ? '26px' : '6px')};
  height: 3px;
  background: ${(p) => (p.$active ? colors.turquoise : 'rgba(244, 246, 242, 0.22)')};
  transition: width 0.4s ease, background 0.4s ease;
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 4.6;
  overflow: hidden;
  border: 1px solid rgba(244, 246, 242, 0.12);

  ${mq.lg} { aspect-ratio: 4 / 4.9; }

  img { object-fit: cover; object-position: 50% 45%; }
`;

const MediaScrim = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(4, 23, 19, 0.24), rgba(4, 23, 19, 0.08) 40%, rgba(4, 23, 19, 0.82) 100%);
`;

const Hud = styled.div`
  position: absolute;
  top: 18px;
  bottom: 18px;
  right: 18px;
  width: 46px;
  border-left: 1px solid rgba(244, 246, 242, 0.16);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding-left: 12px;
  font-size: 9px;
  letter-spacing: 0.12em;
  color: rgba(244, 246, 242, 0.32);
  font-variant-numeric: tabular-nums;

  span { transition: color 0.3s ease; }
  span[data-active='true'] { color: ${colors.turquoise}; }
`;

const Car = styled(motion.div)`
  position: absolute;
  right: 12px;
  width: 30px;
  height: 22px;
  border: 1px solid ${colors.turquoise};
  background: rgba(75, 194, 172, 0.18);
  box-shadow: 0 0 22px rgba(75, 194, 172, 0.35);
  display: grid;
  place-items: center;

  &::before {
    content: '';
    width: 6px;
    height: 1px;
    background: ${colors.turquoise};
  }
`;

const Badge = styled.span`
  position: absolute;
  left: 16px;
  bottom: 16px;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.6);
  background: rgba(4, 19, 16, 0.6);
  border: 1px solid rgba(244, 246, 242, 0.14);
  padding: 7px 10px;
  backdrop-filter: blur(8px);
`;

export default function Journey({ reduceMotion = false }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const carTop = useTransform(scrollYProgress, [0, 1], ['84%', '4%']);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(processSteps.length - 1, Math.floor(value * processSteps.length));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const step = processSteps[index];

  return (
    <Section ref={ref} $reduce={reduceMotion}>
      <Sticky $reduce={reduceMotion}>
        <div className="container">
          <Grid>
            <Copy>
              <Eyebrow tone="dark">The journey</Eyebrow>
              <Title>
                From first call
                <br />
                to <em>handover.</em>
              </Title>

              <Stage aria-live="polite">
                <FloorLine>
                  <FloorNumber>{String(index + 1).padStart(2, '0')}</FloorNumber>
                  <FloorLabel>Stage of eight</FloorLabel>
                </FloorLine>
                <StageTitle>{step.title}</StageTitle>
                <StageText>{step.text}</StageText>
                <Dots aria-hidden="true">
                  {processSteps.map((item, i) => (
                    <Dot key={item.index} $active={i === index} />
                  ))}
                </Dots>
              </Stage>
            </Copy>

            <Media>
              <Image
                src="/images/engineering/shaft.jpg"
                alt="Concept render looking up an elevator shaft with guide rails and traction ropes"
                fill
                sizes="(max-width: 1020px) 100vw, 46vw"
                quality={82}
              />
              <MediaScrim />
              <Hud aria-hidden="true">
                {processSteps.map((item, i) => (
                  <span key={item.index} data-active={i === index}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </Hud>
              <Car style={{ top: carTop }} aria-hidden="true" />
              <Badge>Illustrative shaft journey</Badge>
            </Media>
          </Grid>
        </div>
      </Sticky>
    </Section>
  );
}
