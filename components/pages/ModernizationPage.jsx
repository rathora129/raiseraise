'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { Check, Minus } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CTASection from '@/components/ui/CTASection';
import { modernizationScope, modernizationSigns } from '@/lib/content';
import { whatsappLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Signs = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const SignsGrid = styled.div`
  display: grid;
  gap: 38px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 84px;
    align-items: center;
  }
`;

const Media = styled.figure`
  position: relative;
  aspect-ratio: 4 / 4.5;
  overflow: hidden;
  margin: 0;

  img { object-fit: cover; }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0.06), rgba(4, 23, 19, 0.5));
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
  color: rgba(244, 246, 242, 0.7);
`;

const List = styled.ul`
  display: grid;
  border-top: 1px solid ${colors.line};

  li {
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 16px;
    padding: 17px 0;
    border-bottom: 1px solid ${colors.line};
    font-size: clamp(0.98rem, 1.3vw, 1.1rem);
    line-height: 1.5;
    color: ${colors.charcoal};

    svg { color: ${colors.emerald}; margin-top: 4px; }
  }
`;

const Scope = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const ScopeGrid = styled.div`
  display: grid;
  gap: 1px;
  margin-top: clamp(32px, 5vw, 52px);
  background: ${colors.line};
  border: 1px solid ${colors.line};

  ${mq.sm} { grid-template-columns: 1fr 1fr; }
  ${mq.lg} { grid-template-columns: repeat(3, 1fr); }
`;

const ScopeCard = styled.div`
  background: ${colors.porcelainDeep};
  padding: 28px 24px;
  display: grid;
  gap: 10px;

  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: ${colors.emerald};
  }
  h3 { font-size: 1.04rem; font-weight: 600; letter-spacing: -0.02em; }
  p { font-size: 12.5px; line-height: 1.65; color: ${colors.muted}; }
`;

const Phase = styled.section`
  background: ${colors.forest};
  color: ${colors.porcelain};
  padding: clamp(68px, 8vw, 116px) 0;
`;

const PhaseGrid = styled.div`
  display: grid;
  gap: 0;
  margin-top: clamp(30px, 4vw, 48px);
  border-top: 1px solid rgba(244, 246, 242, 0.16);

  ${mq.md} { grid-template-columns: repeat(4, 1fr); }
`;

const PhaseStep = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid rgba(244, 246, 242, 0.16);

  ${mq.md} {
    padding: 26px 22px;
    border-bottom: 0;
    border-right: 1px solid rgba(244, 246, 242, 0.16);

    &:first-child { padding-left: 0; }
    &:last-child { border-right: 0; }
  }

  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: ${colors.turquoise};
  }
  h3 { margin-top: 12px; font-size: 1.02rem; font-weight: 600; }
  p {
    margin-top: 7px;
    font-size: 12.5px;
    line-height: 1.65;
    color: rgba(244, 246, 242, 0.6);
  }
`;

const Caveat = styled.div`
  margin-top: 28px;
  border: 1px solid rgba(244, 246, 242, 0.16);
  padding: 18px 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  svg { color: ${colors.turquoise}; flex-shrink: 0; margin-top: 2px; }
  p { font-size: 12px; line-height: 1.65; color: rgba(244, 246, 242, 0.6); }
`;

const PHASES = [
  {
    title: 'Assess',
    text: 'Condition survey of the shaft, machine, doors and controller, plus fault history.',
  },
  {
    title: 'Plan',
    text: 'Scope agreed in phases so the building keeps one lift available wherever possible.',
  },
  {
    title: 'Renew',
    text: 'Controller, doors, drive and cabin work sequenced with the building’s operating hours.',
  },
  {
    title: 'Prove',
    text: 'Testing, commissioning and updated documentation before the lift returns to service.',
  },
];

export default function ModernizationPage() {
  return (
    <>
      <PageHero
        eyebrow="Modernization"
        title={'A better lift\ninside the same walls.'}
        lead="Modernization is not a new cabin on an old machine. It is a staged decision about what to keep, what to renew and what the building can support."
        image="/images/spaces/doors-opening.jpg"
        imageAlt="Concept render of bronze elevator doors opening into a finished cabin"
        index="06 — Service"
        meta={[
          { label: 'Starts with', value: 'Condition survey' },
          { label: 'Can include', value: 'Controller · doors · drive · cabin' },
          { label: 'Constraint', value: 'Existing shaft & structure' },
        ]}
        breadcrumbs={[
          { name: 'Services', href: '/installation' },
          { name: 'Modernization', href: '/modernization' },
        ]}
      />

      <Signs>
        <div className="container">
          <SignsGrid>
            <div>
              <Media>
                <Image
                  src="/images/cabins/passenger-cabin.jpg"
                  alt="Concept render of a modern passenger cabin with walnut and steel finishes"
                  fill
                  sizes="(max-width: 1020px) 100vw, 46vw"
                  quality={84}
                />
                <MediaNote>Concept study — renewed cabin</MediaNote>
              </Media>
            </div>
            <div>
              <Eyebrow>When to consider it</Eyebrow>
              <SectionHeader
                title={'Seven signals that\nrenewal is overdue.'}
                lead="Modernization is usually prompted by reliability, parts availability or a building change — not by a desire for a new look alone."
              />
              <List style={{ marginTop: 26 }}>
                {modernizationSigns.map((sign) => (
                  <li key={sign}>
                    <Check size={15} strokeWidth={2} />
                    {sign}
                  </li>
                ))}
              </List>
              <div style={{ marginTop: 26 }}>
                <Button
                  href={whatsappLink('Hello RaiseRaise Elevators, I would like to discuss modernizing an existing lift.')}
                  variant="ink"
                >
                  Discuss a modernization
                </Button>
              </div>
            </div>
          </SignsGrid>
        </div>
      </Signs>

      <Scope>
        <div className="container">
          <SectionHeader
            eyebrow="What renewal can cover"
            title={'Six layers, one\ncoordinated plan.'}
            lead="Each layer can be phased or deferred. The condition survey decides what is worth keeping and what has reached the end of its service life."
          />
          <ScopeGrid>
            {modernizationScope.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04} y={18}>
                <ScopeCard>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </ScopeCard>
              </Reveal>
            ))}
          </ScopeGrid>
        </div>
      </Scope>

      <Phase>
        <div className="container">
          <SectionHeader
            eyebrow="How it runs"
            title={'Assess. Plan. Renew. Prove.'}
            lead="A modernization is a live building project. Sequencing and temporary access are planned with the facility team from the start."
            tone="dark"
          />
          <PhaseGrid>
            {PHASES.map((phase, index) => (
              <PhaseStep key={phase.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </PhaseStep>
            ))}
          </PhaseGrid>
          <Caveat>
            <Minus size={16} />
            <p>
              Not every lift is a good modernization candidate. Where the shaft, structure or
              parts support make renewal uneconomic, we will say so and discuss replacement
              instead — even when it is the smaller sale.
            </p>
          </Caveat>
        </div>
      </Phase>

      <CTASection
        eyebrow="Existing installation"
        title={'Is it time to renew,\nor just repair?'}
        lead="Share the lift age, brand, floor count and fault pattern. We will help you decide which option actually makes sense."
      />
    </>
  );
}
