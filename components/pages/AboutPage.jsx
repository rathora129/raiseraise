'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { Check, CircleDollarSign, Hammer, Handshake, Wrench } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import CTASection from '@/components/ui/CTASection';
import { processSteps } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Story = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const StoryGrid = styled.div`
  display: grid;
  gap: 40px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 84px;
    align-items: start;
  }
`;

const Lead = styled.p`
  font-size: clamp(1.3rem, 2.2vw, 1.9rem);
  line-height: 1.42;
  letter-spacing: -0.03em;
  font-weight: 450;
  color: ${colors.ink};

  em { font-style: normal; color: ${colors.emerald}; }
`;

const Copy = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 26px;
  max-width: 58ch;

  p {
    font-size: 14.5px;
    line-height: 1.75;
    color: ${colors.muted};
  }
`;

const Media = styled.div`
  display: grid;
  gap: 12px;

  figure {
    position: relative;
    aspect-ratio: 4 / 4.4;
    overflow: hidden;
    margin: 0;

    img { object-fit: cover; }
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${colors.muted};
  }
`;

const Scope = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const ScopeGrid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: clamp(32px, 4vw, 48px);

  ${mq.md} { grid-template-columns: 1fr 1fr; }
`;

const ScopeCard = styled.div`
  background: ${colors.porcelain};
  border: 1px solid rgba(14, 28, 24, 0.1);
  padding: clamp(22px, 3vw, 32px);
  display: grid;
  gap: 14px;

  svg { color: ${colors.emerald}; }
`;

const ScopeTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const ScopeText = styled.p`
  font-size: 13.5px;
  line-height: 1.7;
  color: ${colors.muted};
`;

const Disclaimer = styled.aside`
  margin-top: 28px;
  border-left: 2px solid ${colors.turquoise};
  padding: 18px 0 18px 22px;
  max-width: 78ch;

  p {
    font-size: 12.5px;
    line-height: 1.7;
    color: ${colors.muted};
  }
`;

const Steps = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const StepsGrid = styled.div`
  display: grid;
  gap: 0;
  margin-top: clamp(32px, 5vw, 52px);
  border-top: 1px solid ${colors.line};

  ${mq.md} { grid-template-columns: 1fr 1fr; column-gap: 64px; }
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid ${colors.line};

  span {
    font-size: 10px;
    letter-spacing: 0.18em;
    color: ${colors.emerald};
    padding-top: 4px;
  }
  h3 { font-size: 1.02rem; font-weight: 600; }
  p {
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.65;
    color: ${colors.muted};
  }
`;

const SCOPE = [
  {
    icon: Handshake,
    title: 'Planned with partners',
    text: 'Equipment is sourced through manufacturing and supply partners selected for the project. The configuration, interfaces and responsibilities are written down before work starts.',
  },
  {
    icon: Hammer,
    title: 'Installed & coordinated',
    text: 'RaiseRaise coordinates installation with your site team — shaft readiness, power, access, sequencing and testing — and documents the handover.',
  },
  {
    icon: Wrench,
    title: 'Serviced after handover',
    text: 'Preventive maintenance, repairs and modernization are offered under a written scope. Visit frequency, inclusions and exclusions are agreed in the contract.',
  },
  {
    icon: CircleDollarSign,
    title: 'Quoted per project',
    text: 'No generic price list. Quotations follow the site survey and agreed specification, so you can compare like for like instead of guessing what is included.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About RaiseRaise"
        title={'A lift company\nbuilt around trust.'}
        lead="We work on the parts of an elevator that decide whether it feels safe, quiet and cared for — planning, installation, finish and service."
        image="/images/spaces/lobby-hero.jpg"
        imageAlt="Concept render of a dark stone elevator lobby with brushed metal doors"
        index="01 — Company"
        meta={[
          { label: 'Focus', value: 'Elevators, interiors & care' },
          { label: 'Sectors', value: 'Residential · Commercial · Industrial' },
          { label: 'Base', value: 'India' },
        ]}
        breadcrumbs={[{ name: 'About', href: '/about' }]}
      />

      <Story>
        <div className="container">
          <StoryGrid>
            <div>
              <Eyebrow>The premise</Eyebrow>
              <Lead style={{ marginTop: 22 }}>
                Most lifts are chosen once and <em>lived with for decades</em>. That long
                relationship is the part worth designing for.
              </Lead>
              <Copy>
                <p>
                  RaiseRaise Elevators works with builders, architects, facility teams and
                  homeowners on vertical movement. The work ranges from a single villa lift
                  to passenger, hospital and goods installations — each one planned around
                  the building that already exists.
                </p>
                <p>
                  We keep the process legible: what has been surveyed, what has been
                  specified, what is included and what still needs confirmation. Where an
                  answer depends on the site, we say so instead of filling the gap with
                  marketing language.
                </p>
                <p>
                  The public site only shows verified contact details and clearly labelled
                  concept imagery. Finished project photography is published only when it
                  is documented and approved.
                </p>
              </Copy>
              <div style={{ marginTop: 28 }}>
                <Button href="/contact" variant="ink">
                  Talk to the team
                </Button>
              </div>
            </div>

            <Media>
              <figure>
                <Image
                  src="/images/cabins/panoramic-glass.jpg"
                  alt="Concept render of a curved panoramic glass elevator above a city"
                  fill
                  sizes="(max-width: 1020px) 100vw, 46vw"
                  quality={85}
                />
              </figure>
              <figcaption>
                <span>Concept study — panoramic cabin</span>
                <span>Not a completed installation</span>
              </figcaption>
            </Media>
          </StoryGrid>
        </div>
      </Story>

      <Scope>
        <div className="container">
          <SectionHeader
            eyebrow="How the business works"
            title={'Clear about what\nwe do — and don&rsquo;t.'}
            lead="An elevator involves manufacturing, supply, installation, statutory inspection and long-term service. Different companies own different parts of that chain."
          />
          <ScopeGrid>
            {SCOPE.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05} y={20}>
                  <ScopeCard>
                    <Icon size={20} strokeWidth={1.6} />
                    <ScopeTitle>{item.title}</ScopeTitle>
                    <ScopeText>{item.text}</ScopeText>
                  </ScopeCard>
                </Reveal>
              );
            })}
          </ScopeGrid>
          <Disclaimer>
            <p>
              RaiseRaise does not claim to manufacture every product category shown on this
              site. Equipment is supplied through partners, and the manufacturing source,
              warranty terms and statutory approvals are confirmed for each project before
              purchase.
            </p>
          </Disclaimer>
        </div>
      </Scope>

      <Steps>
        <div className="container">
          <SectionHeader
            eyebrow="How we work"
            title={'Eight stages,\nno black boxes.'}
            lead="The same sequence applies whether the project is a villa retrofit or a multi-car installation. It keeps decisions visible and handover predictable."
          />
          <StepsGrid>
            {processSteps.map((step) => (
              <Step key={step.index}>
                <span>{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Step>
            ))}
          </StepsGrid>
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Check size={15} color={colors.emerald} />
            <span style={{ fontSize: 12, color: colors.muted }}>
              Every stage ends with a decision you can review — not a surprise invoice.
            </span>
          </div>
        </div>
      </Steps>

      <CTASection
        eyebrow="Work with us"
        title={'Bring the drawings.\nWe will bring questions.'}
        lead="Early involvement usually saves money later. Share what you know about the building and we will tell you what still needs to be measured."
      />
    </>
  );
}
