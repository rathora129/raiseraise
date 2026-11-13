'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.forestDeep};
  color: ${colors.porcelain};
  padding: clamp(72px, 9vw, 128px) 0;
  overflow: hidden;
`;

const Head = styled.div`
  display: grid;
  gap: 30px;
  margin-bottom: clamp(34px, 5vw, 56px);

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);
    align-items: end;
  }
`;

const Note = styled.div`
  display: grid;
  gap: 16px;
  justify-items: start;
`;

const NoteText = styled.p`
  font-size: 12.5px;
  line-height: 1.7;
  color: rgba(244, 246, 242, 0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  ${mq.md} { grid-template-columns: repeat(12, 1fr); gap: 16px; }
`;

const Cell = styled.figure`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5.2;
  margin: 0;

  ${mq.md} {
    grid-column: span 3;
    aspect-ratio: 3 / 4.6;

    &:nth-child(2) { margin-top: 42px; }
    &:nth-child(3) { margin-top: 84px; }
    &:nth-child(4) { margin-top: 126px; }
  }

  img {
    object-fit: cover;
    transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0) 50%, rgba(4, 23, 19, 0.78) 100%);
  }

  &:hover img { transform: scale(1.04); }
`;

const Caption = styled.figcaption`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;

  span {
    display: block;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.54);
  }
  strong {
    display: block;
    margin-top: 4px;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(244, 246, 242, 0.92);
  }
  svg { color: ${colors.turquoise}; flex-shrink: 0; }
`;

const STUDIES = [
  {
    src: '/images/spaces/lobby-hero.jpg',
    alt: 'Concept study of a dark stone elevator lobby with emerald light',
    label: 'Concept study 01',
    title: 'Arrival lobby',
  },
  {
    src: '/images/cabins/panoramic-glass.jpg',
    alt: 'Concept study of a curved panoramic glass elevator',
    label: 'Concept study 02',
    title: 'Panoramic glass',
  },
  {
    src: '/images/cabins/hospital-cabin.jpg',
    alt: 'Concept study of a stainless steel hospital cabin',
    label: 'Concept study 03',
    title: 'Healthcare cabin',
  },
  {
    src: '/images/cabins/home-lift.jpg',
    alt: 'Concept study of a glass home lift beside a staircase',
    label: 'Concept study 04',
    title: 'Villa lift',
  },
];

export default function ProjectTeaser() {
  return (
    <Section>
      <div className="container">
        <Head>
          <SectionHeader
            eyebrow="Concept studies"
            title={'A portfolio,\nhonestly labelled.'}
            lead="Client photography is not published on this site yet. These studio studies show the proportions and finishes we are working toward — not completed installations."
            tone="dark"
          />
          <Note>
            <NoteText>
              As projects are documented and approved for publication, concept studies will
              be replaced with real photographs.
            </NoteText>
            <Button href="/projects" variant="outlineDark">
              View the studies
            </Button>
          </Note>
        </Head>

        <Grid>
          {STUDIES.map((study, index) => (
            <Reveal key={study.title} delay={index * 0.06} y={30}>
              <Cell>
                <Image
                  src={study.src}
                  alt={study.alt}
                  fill
                  sizes="(max-width: 820px) 50vw, 24vw"
                  quality={80}
                />
                <Caption>
                  <div>
                    <span>{study.label}</span>
                    <strong>{study.title}</strong>
                  </div>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Caption>
              </Cell>
            </Reveal>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
