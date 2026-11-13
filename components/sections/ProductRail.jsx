'use client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { products } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
  overflow: hidden;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: clamp(34px, 5vw, 56px);

  ${mq.md} {
    > div:first-child { flex: 1; }
  }
`;

const Controls = styled.div`
  display: none;
  gap: 8px;

  ${mq.md} { display: flex; }
`;

const Arrow = styled.button`
  width: 46px;
  height: 46px;
  border: 1px solid rgba(14, 28, 24, 0.18);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.ink};
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: ${colors.forest};
    border-color: ${colors.forest};
    color: ${colors.porcelain};
  }

  &:disabled {
    opacity: 0.32;
    cursor: default;
    background: transparent;
    border-color: rgba(14, 28, 24, 0.18);
    color: ${colors.ink};
  }
`;

const TrackWrap = styled.div`
  margin: 0 calc(-1 * clamp(20px, 4vw, 64px));
  padding: 0 clamp(20px, 4vw, 64px);
`;

const Track = styled.ul`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 18px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  ${mq.md} { gap: 24px; }
`;

const Card = styled.li`
  flex: 0 0 76vw;
  max-width: 340px;
  scroll-snap-align: start;

  ${mq.sm} { flex-basis: 58vw; }
  ${mq.md} { flex-basis: 360px; }
  ${mq.xl} { flex-basis: 400px; }
`;

const CardLink = styled(Link)`
  display: grid;
  gap: 16px;
  height: 100%;
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 4.6;
  overflow: hidden;
  background: ${colors.porcelainDeep};

  img {
    object-fit: cover;
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0) 55%, rgba(4, 23, 19, 0.55) 100%);
    transition: opacity 0.4s ease;
  }

  ${CardLink}:hover & img {
    transform: scale(1.045);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 6px 10px;
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.86);
  background: rgba(4, 23, 19, 0.55);
  border: 1px solid rgba(244, 246, 242, 0.16);
  backdrop-filter: blur(8px);
`;

const CardFoot = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 1.6vw, 1.42rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
`;

const Kicker = styled.p`
  margin-top: 6px;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${colors.muted};
`;

const Circle = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(14, 28, 24, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.3s ease, color 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardLink}:hover & {
    background: ${colors.emerald};
    border-color: ${colors.emerald};
    color: ${colors.white};
    transform: rotate(45deg);
  }
`;

const Note = styled.p`
  margin-top: clamp(22px, 3vw, 34px);
  font-size: 11.5px;
  color: ${colors.muted};
  max-width: 62ch;
  line-height: 1.6;
`;

export default function ProductRail({ limit }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const list = limit ? products.slice(0, limit) : products;

  const onScroll = () => {
    const node = trackRef.current;
    if (!node) return;
    setEdges({
      start: node.scrollLeft < 8,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 8,
    });
  };

  const scrollBy = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector('li');
    const width = card ? card.getBoundingClientRect().width + 24 : 380;
    node.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  return (
    <Section>
      <div className="container">
        <Head>
          <SectionHeader
            eyebrow="Product ranges"
            title={'Ten ways to move,\none standard of care.'}
            lead="From a quiet villa lift to a working freight car — the range is configured around the building, not the other way round."
          />
          <Controls>
            <Arrow
              type="button"
              aria-label="Previous product"
              onClick={() => scrollBy(-1)}
              disabled={edges.start}
            >
              <ArrowLeft size={17} />
            </Arrow>
            <Arrow
              type="button"
              aria-label="Next product"
              onClick={() => scrollBy(1)}
              disabled={edges.end}
            >
              <ArrowRight size={17} />
            </Arrow>
          </Controls>
        </Head>
      </div>

      <TrackWrap>
        <Track ref={trackRef} onScroll={onScroll} aria-label="Elevator product ranges">
          {list.map((product) => (
            <Card key={product.id}>
              <Reveal delay={0.05} y={30}>
                <CardLink href={`/products#${product.id}`}>
                  <Media>
                    <Badge>{product.index}</Badge>
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 640px) 76vw, (max-width: 1020px) 58vw, 400px"
                      quality={80}
                    />
                  </Media>
                  <CardFoot>
                    <div>
                      <CardTitle>{product.name}</CardTitle>
                      <Kicker>{product.kicker}</Kicker>
                    </div>
                    <Circle aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </Circle>
                  </CardFoot>
                </CardLink>
              </Reveal>
            </Card>
          ))}
        </Track>
      </TrackWrap>

      <div className="container">
        <Note>
          Product imagery is conceptual, created to communicate finish and proportion. Every
          configuration is confirmed after a site assessment.
        </Note>
      </div>
    </Section>
  );
}
