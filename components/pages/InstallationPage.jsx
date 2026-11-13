'use client';
import styled from 'styled-components';
import { Ruler, ArrowDownToLine, Zap, Truck, Layers, Workflow, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CTASection from '@/components/ui/CTASection';
import { processSteps } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Checks = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const CheckGrid = styled.div`
  display: grid;
  gap: 1px;
  margin-top: clamp(32px, 5vw, 52px);
  background: ${colors.line};
  border: 1px solid ${colors.line};

  ${mq.sm} { grid-template-columns: 1fr 1fr; }
  ${mq.lg} { grid-template-columns: repeat(3, 1fr); }
`;

const Check = styled.div`
  background: ${colors.porcelain};
  padding: 26px 22px;
  display: grid;
  gap: 12px;

  svg { color: ${colors.emerald}; }
  h3 { font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; }
  p { font-size: 12.5px; line-height: 1.65; color: ${colors.muted}; }
`;

const Timeline = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const TimelineGrid = styled.div`
  display: grid;
  gap: 40px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.68fr) minmax(0, 1.32fr);
    gap: 84px;
    align-items: start;
  }
`;

const Side = styled.div`
  ${mq.lg} { position: sticky; top: 130px; }
`;

const Steps = styled.ol`
  position: relative;
  display: grid;
  gap: 0;

  &::before {
    content: '';
    position: absolute;
    left: 21px;
    top: 12px;
    bottom: 12px;
    width: 1px;
    background: rgba(14, 28, 24, 0.16);
  }
`;

const Step = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 20px;
  padding: 0 0 30px;

  &:last-child { padding-bottom: 0; }
`;

const Dot = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(14, 28, 24, 0.16);
  background: ${colors.porcelainDeep};
  display: grid;
  place-items: center;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: ${colors.emerald};
  position: relative;
  z-index: 1;
  font-variant-numeric: tabular-nums;
`;

const StepBody = styled.div`
  padding-top: 8px;
  h3 { font-size: 1.06rem; font-weight: 600; letter-spacing: -0.02em; }
  p {
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.65;
    color: ${colors.muted};
    max-width: 52ch;
  }
`;

const Safety = styled.section`
  background: ${colors.forest};
  color: ${colors.porcelain};
  padding: clamp(64px, 8vw, 110px) 0;
`;

const SafetyGrid = styled.div`
  display: grid;
  gap: 34px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 80px;
    align-items: center;
  }
`;

const SafetyTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 550;
  max-width: 14ch;

  em { font-style: normal; color: ${colors.turquoiseSoft}; }
`;

const SafetyList = styled.ul`
  display: grid;
  gap: 0;

  li {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 16px;
    padding: 18px 0;
    border-top: 1px solid rgba(244, 246, 242, 0.14);
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(244, 246, 242, 0.74);

    &:last-child { border-bottom: 1px solid rgba(244, 246, 242, 0.14); }
    svg { color: ${colors.turquoise}; margin-top: 2px; }
  }
`;

const CHECKS = [
  {
    icon: Ruler,
    title: 'Shaft dimensions',
    text: 'Internal clear sizes, plumb and verticality — recorded, not taken from an old drawing.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Headroom & pit',
    text: 'Overhead clearance, pit depth and buffer space verified against the proposed model.',
  },
  {
    icon: Zap,
    title: 'Power & earthing',
    text: 'Supply capacity, isolation point, cable route and earthing checked with the electrical team.',
  },
  {
    icon: Truck,
    title: 'Access & lifting',
    text: 'Material routes, door openings, staging area and lifting points planned before delivery.',
  },
  {
    icon: Layers,
    title: 'Structure',
    text: 'Load paths, counterweight space and fixing strategy reviewed with the structural engineer.',
  },
  {
    icon: Workflow,
    title: 'Building interfaces',
    text: 'Landing finishes, fire strategy, ventilation and other services coordinated early.',
  },
];

const SAFETY = [
  'Landing and shaft openings are barricaded and signed for the full installation period.',
  'Lifting operations follow a written plan, with the site team briefed before each stage.',
  'Electrical isolation and lock-off procedures are agreed with the main contractor.',
  'Daily housekeeping keeps access routes and fire exits clear.',
  'Testing happens stage by stage, with results recorded before commissioning.',
];

export default function InstallationPage() {
  return (
    <>
      <PageHero
        eyebrow="Installation & engineering"
        title={'The shaft decides\nmore than the cabin.'}
        lead="A lift only performs as well as the shaft, headroom, power and structure around it. We measure first, then commit to a configuration."
        image="/images/engineering/shaft.jpg"
        imageAlt="Concept render looking up an elevator shaft with guide rails and traction ropes"
        index="03 — Service"
        meta={[
          { label: 'Starts with', value: 'Site survey & drawings' },
          { label: 'Coordinate with', value: 'Civil, electrical & structural teams' },
          { label: 'Ends with', value: 'Testing, commissioning, handover' },
        ]}
        breadcrumbs={[
          { name: 'Services', href: '/installation' },
          { name: 'Installation', href: '/installation' },
        ]}
      />

      <Checks>
        <div className="container">
          <SectionHeader
            eyebrow="Before we quote"
            title={'Six checks that prevent\nsix-figure surprises.'}
            lead="These are the items that most often change a lift design after the order. We record them before the configuration is fixed."
          />
          <CheckGrid>
            {CHECKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.04} y={18}>
                  <Check>
                    <Icon size={19} strokeWidth={1.6} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </Check>
                </Reveal>
              );
            })}
          </CheckGrid>
        </div>
      </Checks>

      <Timeline>
        <div className="container">
          <TimelineGrid>
            <Side>
              <Eyebrow>Installation sequence</Eyebrow>
              <div style={{ marginTop: 18 }}>
                <SectionHeader
                  title={'A site is a sequence,\nnot a delivery.'}
                  lead="Each stage is signed off before the next one depends on it. That is how handover dates stay believable."
                />
              </div>
              <div style={{ marginTop: 24 }}>
                <Button href="/contact" variant="ink">
                  Plan an installation
                </Button>
              </div>
            </Side>

            <Steps>
              {processSteps.map((step) => (
                <Step key={step.index}>
                  <Dot>{step.index}</Dot>
                  <StepBody>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </StepBody>
                </Step>
              ))}
            </Steps>
          </TimelineGrid>
        </div>
      </Timeline>

      <Safety>
        <div className="container">
          <SafetyGrid>
            <div>
              <Eyebrow tone="dark">Site safety</Eyebrow>
              <SafetyTitle style={{ marginTop: 18 }}>
                An installation is a <em>construction site.</em>
              </SafetyTitle>
            </div>
            <SafetyList>
              {SAFETY.map((item) => (
                <li key={item}>
                  <ShieldCheck size={16} strokeWidth={1.7} />
                  {item}
                </li>
              ))}
            </SafetyList>
          </SafetyGrid>
        </div>
      </Safety>

      <CTASection
        eyebrow="Project planning"
        title={'Have a shaft\nor a set of drawings?'}
        lead="Send the drawings, floor count and building use. We will identify what can be confirmed remotely and what needs a site visit."
      />
    </>
  );
}
