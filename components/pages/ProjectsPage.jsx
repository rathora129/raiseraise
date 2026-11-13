'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import CTASection from '@/components/ui/CTASection';
import { colors, mq } from '@/lib/theme';

const GallerySection = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(64px, 8vw, 112px) 0;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 30px;
`;

const Filter = styled.button`
  padding: 9px 15px;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$active ? colors.forest : 'rgba(14, 28, 24, 0.16)')};
  background: ${(p) => (p.$active ? colors.forest : 'transparent')};
  color: ${(p) => (p.$active ? colors.porcelain : colors.muted)};
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${colors.forest};
    color: ${(p) => (p.$active ? colors.porcelain : colors.ink)};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 26px;

  ${mq.md} { grid-template-columns: repeat(3, 1fr); gap: 14px; }
  ${mq.lg} { grid-template-columns: repeat(4, 1fr); }
`;

const Item = styled(motion.button)`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: ${colors.stone};
  aspect-ratio: ${(p) => p.$wide || '4 / 5'};
  text-align: left;
  cursor: zoom-in;

  img {
    object-fit: cover;
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img { transform: scale(1.05); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0) 52%, rgba(4, 23, 19, 0.74) 100%);
  }
`;

const Tag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  padding: 5px 8px;
  background: rgba(4, 23, 19, 0.55);
  border: 1px solid rgba(244, 246, 242, 0.18);
  backdrop-filter: blur(8px);
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.8);
`;

const Caption = styled.span`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  color: ${colors.porcelain};

  strong {
    display: block;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
  }
  small {
    display: block;
    margin-top: 4px;
    font-size: 8.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.52);
  }
  svg { flex-shrink: 0; color: ${colors.turquoise}; }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2500;
  background: rgba(4, 19, 16, 0.94);
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 48px);
`;

const LightboxInner = styled(motion.div)`
  position: relative;
  width: min(1100px, 100%);
  max-height: 88vh;
  display: grid;
  gap: 14px;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${colors.forestDeep};

  img {
    object-fit: contain;
  }
`;

const LightboxBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: ${colors.porcelain};

  span { font-size: 12px; color: rgba(244, 246, 242, 0.7); }
  strong { display: block; font-size: 13px; font-weight: 500; }
  small {
    display: block;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.45);
    margin-top: 3px;
  }
`;

const BarActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(244, 246, 242, 0.24);
  color: ${colors.porcelain};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba(244, 246, 242, 0.1);
    border-color: rgba(244, 246, 242, 0.5);
  }
`;

const CloseBtn = styled(IconBtn)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(4, 19, 16, 0.7);
  z-index: 2;
`;

const Note = styled.p`
  margin-top: 26px;
  font-size: 11.5px;
  line-height: 1.65;
  color: ${colors.muted};
  max-width: 72ch;
`;

const ITEMS = [
  {
    src: '/images/spaces/lobby-hero.jpg',
    alt: 'Concept study of a dark stone elevator lobby with emerald light',
    title: 'Arrival lobby',
    category: 'Lobbies',
    wide: '4 / 4',
  },
  {
    src: '/images/cabins/passenger-cabin.jpg',
    alt: 'Concept study of a passenger elevator cabin with walnut and steel',
    title: 'Passenger cabin',
    category: 'Cabins',
  },
  {
    src: '/images/cabins/panoramic-glass.jpg',
    alt: 'Concept study of a curved panoramic glass elevator above a city',
    title: 'Panoramic capsule',
    category: 'Cabins',
  },
  {
    src: '/images/spaces/doors-opening.jpg',
    alt: 'Concept study of bronze elevator doors opening into a cabin',
    title: 'Bronze door reveal',
    category: 'Lobbies',
  },
  {
    src: '/images/cabins/hospital-cabin.jpg',
    alt: 'Concept study of a stainless steel hospital cabin',
    title: 'Hospital cabin',
    category: 'Cabins',
  },
  {
    src: '/images/details/ceiling-light.jpg',
    alt: 'Concept study of a backlit ceiling with warm downlights',
    title: 'Backlit ceiling',
    category: 'Details',
  },
  {
    src: '/images/cabins/goods-cabin.jpg',
    alt: 'Concept study of a freight elevator interior',
    title: 'Freight cabin',
    category: 'Cabins',
  },
  {
    src: '/images/engineering/shaft.jpg',
    alt: 'Concept study looking up an elevator shaft',
    title: 'Shaft geometry',
    category: 'Engineering',
    wide: '4 / 4',
  },
  {
    src: '/images/cabins/home-lift.jpg',
    alt: 'Concept study of a glass home lift beside a staircase',
    title: 'Villa lift',
    category: 'Cabins',
  },
  {
    src: '/images/details/control-panel.jpg',
    alt: 'Concept study of a brushed metal control panel',
    title: 'Control interface',
    category: 'Details',
  },
  {
    src: '/images/engineering/machine-room.jpg',
    alt: 'Concept study of a clean machine room',
    title: 'Machine room',
    category: 'Engineering',
  },
];

const CATEGORIES = ['All', 'Cabins', 'Lobbies', 'Details', 'Engineering'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const visible = filter === 'All' ? ITEMS : ITEMS.filter((item) => item.category === filter);
  const current = open === null ? null : visible[open];

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(null);
      if (event.key === 'ArrowRight') setOpen((prev) => (prev + 1) % visible.length);
      if (event.key === 'ArrowLeft') setOpen((prev) => (prev - 1 + visible.length) % visible.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, visible.length]);

  return (
    <>
      <PageHero
        eyebrow="Projects & gallery"
        title={'Concept studies,\nclearly labelled.'}
        lead="Client photography is not published yet. This gallery shows the proportions, materials and moods we are designing toward — not completed installations."
        image="/images/cabins/panoramic-glass.jpg"
        imageAlt="Concept render of a curved panoramic glass elevator above a city"
        index="08 — Gallery"
        meta={[
          { label: 'Status', value: 'Concept studies' },
          { label: 'Current count', value: `${ITEMS.length} studies` },
          { label: 'Client projects', value: 'Published after approval' },
        ]}
        breadcrumbs={[{ name: 'Projects', href: '/projects' }]}
      />

      <GallerySection>
        <div className="container">
          <SectionHeader
            eyebrow="Gallery"
            title={'Explore the visual\nlanguage.'}
            lead="Filter by the part of the lift you are interested in. Every study is generated for this site and labelled accordingly."
          />

          <Controls role="group" aria-label="Filter concept studies">
            {CATEGORIES.map((category) => (
              <Filter
                key={category}
                type="button"
                $active={filter === category}
                aria-pressed={filter === category}
                onClick={() => {
                  setFilter(category);
                  setOpen(null);
                }}
              >
                {category}
              </Filter>
            ))}
          </Controls>

          <Grid>
            <AnimatePresence mode="popLayout">
              {visible.map((item, index) => (
                <Item
                  key={`${item.title}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  $wide={item.wide}
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`Open ${item.title} concept study`}
                >
                  <Tag>Concept</Tag>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 820px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    quality={78}
                  />
                  <Caption>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.category}</small>
                    </span>
                    <Expand size={15} />
                  </Caption>
                </Item>
              ))}
            </AnimatePresence>
          </Grid>

          <Note>
            These images are conceptual renders created for this website. They do not depict
            completed client installations. Approved project photography will replace them
            as documentation becomes available.
          </Note>
        </div>
      </GallerySection>

      <AnimatePresence>
        {current && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <CloseBtn type="button" aria-label="Close gallery" onClick={() => setOpen(null)} autoFocus>
              <X size={18} />
            </CloseBtn>
            <LightboxInner
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Frame>
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="90vw"
                  quality={88}
                  priority
                />
              </Frame>
              <LightboxBar>
                <span>
                  <strong>{current.title}</strong>
                  <small>Concept study — not a completed installation</small>
                </span>
                <BarActions>
                  <IconBtn
                    type="button"
                    aria-label="Previous study"
                    onClick={() => setOpen((open - 1 + visible.length) % visible.length)}
                  >
                    <ArrowLeft size={16} />
                  </IconBtn>
                  <IconBtn
                    type="button"
                    aria-label="Next study"
                    onClick={() => setOpen((open + 1) % visible.length)}
                  >
                    <ArrowRight size={16} />
                  </IconBtn>
                </BarActions>
              </LightboxBar>
            </LightboxInner>
          </Lightbox>
        )}
      </AnimatePresence>

      <CTASection
        eyebrow="Your project"
        title={'Want to see this\nkind of finish in person?'}
        lead="Samples and drawings are the honest next step. Tell us what you are planning and we will arrange the right conversation."
      />
    </>
  );
}
