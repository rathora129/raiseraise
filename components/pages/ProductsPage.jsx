'use client';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { Check, MessageCircle } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import FaqSection from '@/components/sections/FaqSection';
import CTASection from '@/components/ui/CTASection';
import { products } from '@/lib/content';
import { whatsappLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const IndexStrip = styled.nav`
  position: sticky;
  top: 70px;
  z-index: 40;
  background: rgba(244, 246, 242, 0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${colors.line};
`;

const IndexInner = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  a {
    flex-shrink: 0;
    padding: 7px 12px;
    border: 1px solid rgba(14, 28, 24, 0.14);
    border-radius: 999px;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.muted};
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;

    &:hover {
      background: ${colors.forest};
      border-color: ${colors.forest};
      color: ${colors.porcelain};
    }
  }
`;

const List = styled.div`
  background: ${colors.porcelain};
  color: ${colors.ink};
`;

const Row = styled.article`
  padding: clamp(58px, 8vw, 104px) 0;
  border-bottom: 1px solid ${colors.line};
  scroll-margin-top: 150px;

  &:nth-child(even) {
    background: ${colors.porcelainDeep};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 34px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: 72px;
    align-items: center;

    ${(p) =>
      p.$flip &&
      css`
        & > figure { order: 2; }
      `}
  }
`;

const Media = styled.figure`
  position: relative;
  aspect-ratio: 4 / 4.4;
  overflow: hidden;
  margin: 0;
  background: ${colors.stone};

  img {
    object-fit: cover;
    transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img { transform: scale(1.035); }
`;

const MediaTag = styled.span`
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 2;
  padding: 6px 10px;
  background: rgba(4, 23, 19, 0.55);
  border: 1px solid rgba(244, 246, 242, 0.18);
  backdrop-filter: blur(8px);
  font-size: 8.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.8);
`;

const Body = styled.div`
  display: grid;
  gap: 20px;
  max-width: 60ch;
`;

const Kicker = styled.span`
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${colors.emerald};
`;

const Name = styled.h2`
  font-size: clamp(2rem, 3.8vw, 3.4rem);
  line-height: 0.98;
  letter-spacing: -0.045em;
  font-weight: 550;
`;

const Summary = styled.p`
  font-size: 15px;
  line-height: 1.72;
  color: ${colors.muted};
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Chip = styled.span`
  padding: 6px 10px;
  border: 1px solid rgba(14, 28, 24, 0.14);
  border-radius: 999px;
  font-size: 10.5px;
  letter-spacing: 0.05em;
  color: ${colors.charcoal};
`;

const Options = styled.ul`
  display: grid;
  gap: 9px;
  margin-top: 4px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    line-height: 1.55;
    color: ${colors.charcoal};
  }

  svg { color: ${colors.emerald}; flex-shrink: 0; margin-top: 3px; }
`;

const Note = styled.p`
  font-size: 11.5px;
  line-height: 1.65;
  color: ${colors.muted};
  border-left: 1px solid rgba(14, 28, 24, 0.2);
  padding-left: 14px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product ranges"
        title={'Ten ranges.\nOne standard.'}
        lead="Passenger, home, hospital, goods, panoramic and special lifts — configured around traffic, structure and the finish your building needs."
        image="/images/cabins/passenger-cabin.jpg"
        imageAlt="Concept render of a luxury passenger elevator cabin with walnut walls"
        index="02 — Elevators"
        meta={[
          { label: 'Ranges', value: 'Ten documented types' },
          { label: 'Configuration', value: 'Confirmed after survey' },
          { label: 'Availability', value: 'Confirmed per project' },
        ]}
        breadcrumbs={[{ name: 'Products', href: '/products' }]}
      />

      <IndexStrip aria-label="Product index">
        <div className="container">
          <IndexInner>
            {products.map((product) => (
              <a key={product.id} href={`#${product.id}`}>
                {product.index} · {product.name}
              </a>
            ))}
          </IndexInner>
        </div>
      </IndexStrip>

      <List>
        {products.map((product, index) => (
          <Row key={product.id} id={product.id}>
            <div className="container">
              <Grid $flip={index % 2 === 1}>
                <Media>
                  <MediaTag>Concept study</MediaTag>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 1020px) 100vw, 44vw"
                    quality={84}
                  />
                </Media>

                <Reveal y={22}>
                  <Body>
                    <Eyebrow>{`${product.index} — ${product.kicker}`}</Eyebrow>
                    <div>
                      <Kicker>{product.applications.join(' · ')}</Kicker>
                      <Name style={{ marginTop: 8 }}>{product.name}</Name>
                    </div>
                    <Summary>{product.summary}</Summary>

                    <Chips aria-label="Typical applications">
                      {product.applications.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
                    </Chips>

                    <Options>
                      {product.options.map((option) => (
                        <li key={option}>
                          <Check size={13} strokeWidth={2} />
                          {option}
                        </li>
                      ))}
                    </Options>

                    <Note>{product.note}</Note>

                    <Actions>
                      <Button
                        href={whatsappLink(
                          `Hello RaiseRaise Elevators, I would like to discuss ${product.name.toLowerCase()}.`
                        )}
                        variant="ink"
                      >
                        <MessageCircle size={14} style={{ marginRight: 8, verticalAlign: -2 }} />
                        Discuss this range
                      </Button>
                      <Button href="/contact" variant="outlineLight">
                        Send requirements
                      </Button>
                    </Actions>
                  </Body>
                </Reveal>
              </Grid>
            </div>
          </Row>
        ))}
      </List>

      <section style={{ background: colors.porcelain, padding: 'clamp(56px, 7vw, 88px) 0' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Before you choose"
            title="Availability is confirmed, not assumed."
            lead="The ranges shown here are the ones we plan and deliver most often. The exact model, manufacturer, capacity and code compliance are confirmed for your project after the site review."
          />
        </div>
      </section>

      <FaqSection
        eyebrow="Product questions"
        title={'Practical answers\nbefore the first survey.'}
        lead="What can be configured, what depends on the site, and what we will not promise before checking."
      />
      <CTASection
        eyebrow="Configure your lift"
        title={'Which range fits\nyour building?'}
        lead="Send the building type, floor count and intended use. We will suggest a direction and tell you what needs measuring."
      />
    </>
  );
}
