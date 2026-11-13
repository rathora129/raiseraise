'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { industries } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 36px;
  margin-top: clamp(32px, 5vw, 56px);

  ${mq.lg} {
    grid-template-columns: minmax(340px, 0.85fr) minmax(0, 1.15fr);
    gap: 72px;
    align-items: start;
  }
`;

const List = styled.div`
  border-top: 1px solid ${colors.line};
`;

const Row = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid ${colors.line};
  text-align: left;
  color: ${(p) => (p.$active ? colors.emerald : colors.ink)};
  transition: color 0.25s ease, padding-left 0.35s ease;

  ${mq.hover} {
    &:hover { color: ${colors.emerald}; padding-left: 6px; }
  }

  svg {
    opacity: ${(p) => (p.$active ? 1 : 0)};
    transition: opacity 0.25s ease, transform 0.35s ease;
    transform: rotate(${(p) => (p.$active ? '45deg' : '0deg')});
  }
`;

const Index = styled.span`
  font-size: 10px;
  letter-spacing: 0.18em;
  color: ${(p) => (p.$active ? colors.emerald : colors.muted)};
  font-variant-numeric: tabular-nums;
`;

const Name = styled.span`
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  font-weight: 550;
  letter-spacing: -0.02em;
`;

const MobileText = styled.p`
  grid-column: 2 / -1;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.muted};

  ${mq.lg} { display: none; }
`;

const MediaWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 4.4;
  overflow: hidden;
  background: ${colors.porcelainDeep};

  ${mq.lg} {
    position: sticky;
    top: 120px;
    aspect-ratio: 4 / 4.7;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  inset: 0;

  img { object-fit: cover; }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(4, 23, 19, 0.05) 40%, rgba(4, 23, 19, 0.74) 100%);
`;

const Caption = styled.div`
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 22px;
  color: ${colors.porcelain};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
`;

const CaptionTitle = styled.span`
  display: block;
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${colors.turquoiseSoft};
  margin-bottom: 6px;
`;

const CaptionText = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  max-width: 36ch;
  color: rgba(244, 246, 242, 0.82);
`;

const Counter = styled.span`
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(244, 246, 242, 0.6);
  white-space: nowrap;
`;

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <Section>
      <div className="container">
        <SectionHeader
          eyebrow="Built for different buildings"
          title={'One engineer, many\nkinds of movement.'}
          lead="The same discipline carries across sectors — the cabin, capacity and control strategy change with the people and loads it serves."
        />

        <Grid>
          <Reveal>
            <List role="tablist" aria-label="Sectors we serve">
              {industries.map((item, index) => {
                const isActive = index === active;
                return (
                  <Row
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    $active={isActive}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                  >
                    <Index $active={isActive}>{String(index + 1).padStart(2, '0')}</Index>
                    <Name>{item.name}</Name>
                    <ArrowUpRight size={17} aria-hidden="true" />
                    <MobileText>{item.text}</MobileText>
                  </Row>
                );
              })}
            </List>
          </Reveal>

          <MediaWrap>
            <AnimatePresence mode="wait">
              <Slide
                key={current.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1020px) 100vw, 58vw"
                  quality={82}
                />
              </Slide>
            </AnimatePresence>
            <Scrim />
            <Caption>
              <div>
                <CaptionTitle>{current.name}</CaptionTitle>
                <CaptionText>{current.text}</CaptionText>
              </div>
              <Counter>
                {String(active + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}
              </Counter>
            </Caption>
          </MediaWrap>
        </Grid>
      </div>
    </Section>
  );
}
