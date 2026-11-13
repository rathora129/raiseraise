'use client';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import HomeHero from '@/components/sections/HomeHero';
import ProductRail from '@/components/sections/ProductRail';
import StudioPreview from '@/components/sections/StudioPreview';
import Industries from '@/components/sections/Industries';
import Journey from '@/components/sections/Journey';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Principles from '@/components/sections/Principles';
import ProjectTeaser from '@/components/sections/ProjectTeaser';
import FaqSection from '@/components/sections/FaqSection';
import CTASection from '@/components/ui/CTASection';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitLines from '@/components/ui/SplitLines';
import { useReducedMotion } from 'framer-motion';
import { colors, mq } from '@/lib/theme';

const Strip = styled.div`
  background: ${colors.porcelain};
  padding: 18px 0;
`;

const Manifesto = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(76px, 10vw, 140px) 0;
`;

const ManifestoGrid = styled.div`
  display: grid;
  gap: 36px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
    gap: 88px;
  }
`;

const ManifestoTitle = styled.h2`
  font-size: clamp(2.2rem, 4.6vw, 4.1rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  font-weight: 550;
  max-width: 15ch;

  em { font-style: normal; color: ${colors.emerald}; }
`;

const Body = styled.div`
  display: grid;
  gap: 30px;
`;

const Statement = styled.p`
  font-size: clamp(1.05rem, 1.55vw, 1.28rem);
  line-height: 1.6;
  color: ${colors.ink};
  max-width: 62ch;

  strong { font-weight: 600; }
`;

const Pillars = styled.div`
  display: grid;
  gap: 1px;
  background: ${colors.line};
  border-top: 1px solid ${colors.line};
  border-bottom: 1px solid ${colors.line};

  ${mq.md} { grid-template-columns: repeat(3, 1fr); }
`;

const Pillar = styled.div`
  background: ${colors.porcelain};
  padding: 24px 0 26px;

  ${mq.md} { padding: 26px 24px; &:first-child { padding-left: 0; } }
`;

const PillarIndex = styled.span`
  font-size: 9px;
  letter-spacing: 0.22em;
  color: ${colors.emerald};
`;

const PillarTitle = styled.h3`
  margin-top: 12px;
  font-size: 1.06rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const PillarText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.65;
  color: ${colors.muted};
`;

const Care = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const CareGrid = styled.div`
  display: grid;
  gap: 16px;

  ${mq.md} { grid-template-columns: 1fr 1fr; }
`;

const CareCard = styled(Link)`
  position: relative;
  overflow: hidden;
  min-height: clamp(360px, 46vw, 520px);
  display: flex;
  align-items: flex-end;
  padding: clamp(22px, 3vw, 36px);
  color: ${colors.porcelain};

  img {
    object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0.08) 30%, rgba(4, 23, 19, 0.82) 100%);
  }

  &:hover img { transform: scale(1.045); }
`;

const CareInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: 10px;
  max-width: 44ch;
`;

const CareLabel = styled.span`
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${colors.turquoiseSoft};
`;

const CareTitle = styled.h3`
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  font-weight: 550;
  letter-spacing: -0.035em;
  line-height: 1.05;
`;

const CareText = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: rgba(244, 246, 242, 0.72);
`;

const CareArrow = styled.span`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${colors.porcelain};
`;

export default function HomePage() {
  const reduce = useReducedMotion();

  return (
    <>
      <HomeHero />

      <Strip>
        <Marquee
          items={[
            'Passenger',
            'Home & villa',
            'Hospital',
            'Goods & freight',
            'Panoramic',
            'Automobile',
            'Dumbwaiter',
            'MRL & traction',
            'Custom',
          ]}
          speed={46}
        />
      </Strip>

      <Manifesto>
        <div className="container">
          <ManifestoGrid>
            <div>
              <Eyebrow>RaiseRaise Elevators</Eyebrow>
              <ManifestoTitle style={{ marginTop: 22 }}>
                <SplitLines as="span" text={'Planned once.\nLived with for years.'} />
              </ManifestoTitle>
            </div>
            <Body>
              <Reveal>
                <Statement>
                  An elevator is one of the few building decisions made once and lived with
                  every day. <strong>We plan for the second part</strong> — the ride, the
                  doors, the finish and the call that gets answered years after handover.
                </Statement>
              </Reveal>
              <Pillars>
                <Pillar>
                  <PillarIndex>01</PillarIndex>
                  <PillarTitle>Plan</PillarTitle>
                  <PillarText>
                    Site survey, traffic, shaft geometry and structural interfaces reviewed
                    before a configuration is proposed.
                  </PillarText>
                </Pillar>
                <Pillar>
                  <PillarIndex>02</PillarIndex>
                  <PillarTitle>Build</PillarTitle>
                  <PillarText>
                    Installation sequenced with your site team, tested stage by stage and
                    documented at handover.
                  </PillarText>
                </Pillar>
                <Pillar>
                  <PillarIndex>03</PillarIndex>
                  <PillarTitle>Care</PillarTitle>
                  <PillarText>
                    Preventive maintenance, repair support and modernization when the
                    building is ready for the next chapter.
                  </PillarText>
                </Pillar>
              </Pillars>
            </Body>
          </ManifestoGrid>
        </div>
      </Manifesto>

      <ProductRail limit={6} />
      <StudioPreview />

      <Industries />
      <Journey reduceMotion={reduce} />
      <ServicesGrid />
      <Principles />

      <Care>
        <div className="container">
          <CareGrid>
            <CareCard href="/maintenance">
              <Image
                src="/images/engineering/machine-room.jpg"
                alt="Concept render of a clean elevator machine room with traction equipment"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                quality={82}
              />
              <CareInner>
                <CareLabel>Maintenance & AMC</CareLabel>
                <CareTitle>Care that keeps the ride consistent.</CareTitle>
                <CareText>
                  Planned visits, clear checklists and a written scope — not vague promises
                  of &ldquo;regular service&rdquo;.
                </CareText>
                <CareArrow>
                  Explore maintenance <ArrowUpRight size={14} />
                </CareArrow>
              </CareInner>
            </CareCard>

            <CareCard href="/modernization">
              <Image
                src="/images/spaces/doors-opening.jpg"
                alt="Concept render of bronze elevator doors opening into a finished cabin"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                quality={82}
              />
              <CareInner>
                <CareLabel>Modernization</CareLabel>
                <CareTitle>New performance, existing structure.</CareTitle>
                <CareText>
                  Controller, doors, drive and cabin renewed around the building you already
                  have — with the disruption planned, not improvised.
                </CareText>
                <CareArrow>
                  Explore modernization <ArrowUpRight size={14} />
                </CareArrow>
              </CareInner>
            </CareCard>
          </CareGrid>
        </div>
      </Care>

      <ProjectTeaser />
      <FaqSection />
      <CTASection />
    </>
  );
}
