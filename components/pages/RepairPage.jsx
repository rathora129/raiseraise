'use client';
import styled from 'styled-components';
import { AlertTriangle, MessageSquare, Search, ThumbsUp, Wrench } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CTASection from '@/components/ui/CTASection';
import { repairCategories } from '@/lib/content';
import { site, telLink, whatsappLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Alert = styled.section`
  background: ${colors.forest};
  color: ${colors.porcelain};
  padding: clamp(40px, 5vw, 64px) 0;
`;

const AlertGrid = styled.div`
  display: grid;
  gap: 26px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 72px;
    align-items: start;
  }
`;

const AlertTitle = styled.h2`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: clamp(1.3rem, 2.4vw, 1.85rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
  font-weight: 600;

  svg { color: ${colors.turquoise}; flex-shrink: 0; margin-top: 4px; }
`;

const AlertList = styled.ol`
  display: grid;
  gap: 14px;
  counter-reset: alert;

  li {
    counter-increment: alert;
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 14px;
    font-size: 13.5px;
    line-height: 1.65;
    color: rgba(244, 246, 242, 0.76);

    &::before {
      content: counter(alert, decimal-leading-zero);
      font-size: 9px;
      letter-spacing: 0.14em;
      color: ${colors.turquoise};
      padding-top: 3px;
    }
  }
`;

const AlertActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
`;

const Categories = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 1px;
  margin-top: clamp(32px, 5vw, 52px);
  background: ${colors.line};
  border: 1px solid ${colors.line};

  ${mq.sm} { grid-template-columns: 1fr 1fr; }
  ${mq.lg} { grid-template-columns: repeat(3, 1fr); }
`;

const Card = styled.div`
  background: ${colors.porcelain};
  padding: 26px 22px;
  display: grid;
  gap: 10px;

  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: ${colors.emerald};
  }
  h3 { font-size: 1.02rem; font-weight: 600; letter-spacing: -0.02em; }
  p { font-size: 12.5px; line-height: 1.65; color: ${colors.muted}; }
`;

const Process = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 26px;
  margin-top: clamp(32px, 5vw, 52px);

  ${mq.md} { grid-template-columns: repeat(2, 1fr); }
  ${mq.xl} { grid-template-columns: repeat(4, 1fr); }
`;

const Step = styled.div`
  border-top: 1px solid rgba(14, 28, 24, 0.18);
  padding-top: 20px;

  svg { color: ${colors.emerald}; }
  h3 { margin-top: 14px; font-size: 1.02rem; font-weight: 600; }
  p { margin-top: 7px; font-size: 12.5px; line-height: 1.65; color: ${colors.muted}; }
`;

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Describe the symptom',
    text: 'What happens, on which floor, and whether it repeats. A short video is often more useful than a paragraph.',
  },
  {
    icon: Search,
    title: 'Diagnose on site',
    text: 'The controller log, door cycle and drive behaviour usually narrow the cause before any part is ordered.',
  },
  {
    icon: ThumbsUp,
    title: 'Approve the repair',
    text: 'We explain the finding and the fix, then proceed with your approval — no surprise parts on the invoice.',
  },
  {
    icon: Wrench,
    title: 'Repair, test, record',
    text: 'The lift is tested through a full cycle and the work is recorded in the service history.',
  },
];

export default function RepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Repair & breakdown"
        title={'Diagnosis first.\nParts second.'}
        lead="A lift that stops is a symptom. We trace the cause — door cycle, controller, drive or supply — before recommending what to replace."
        image="/images/details/control-panel.jpg"
        imageAlt="Concept render of a brushed steel elevator control panel with illuminated buttons"
        index="05 — Service"
        meta={[
          { label: 'Coverage', value: 'Confirmed by location & agreement' },
          { label: 'Approach', value: 'Diagnose, quote, approve, test' },
          { label: 'Records', value: 'Repair history retained' },
        ]}
        breadcrumbs={[
          { name: 'Services', href: '/installation' },
          { name: 'Repair & emergency', href: '/repair' },
        ]}
      />

      <Alert>
        <div className="container">
          <AlertGrid>
            <div>
              <AlertTitle>
                <AlertTriangle size={22} />
                If someone is trapped inside
              </AlertTitle>
              <AlertActions>
                {telLink && (
                  <Button href={telLink} variant="primary">
                    Call {site.phoneDisplay}
                  </Button>
                )}
                <Button href={whatsappLink('Hello RaiseRaise Elevators, we have an elevator breakdown and need assistance.')} variant="outlineDark">
                  Message us
                </Button>
              </AlertActions>
            </div>
            <AlertList>
              <li>Use the alarm or intercom inside the car and call the emergency number displayed there.</li>
              <li>Stay calm and keep the car ventilated. Modern cars have ventilation and emergency lighting.</li>
              <li>Do not force the doors or attempt to leave between floors — wait for trained help.</li>
              <li>If anyone feels unwell, say so clearly when you reach the emergency contact.</li>
            </AlertList>
          </AlertGrid>
        </div>
      </Alert>

      <Categories>
        <div className="container">
          <SectionHeader
            eyebrow="Common faults"
            title={'Six places a lift\nusually tells you first.'}
            lead="These categories cover most breakdown calls. The actual cause is confirmed on site, not guessed from a description."
          />
          <Grid>
            {repairCategories.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04} y={18}>
                <Card>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Card>
              </Reveal>
            ))}
          </Grid>
        </div>
      </Categories>

      <Process>
        <div className="container">
          <Eyebrow>How a repair runs</Eyebrow>
          <SectionHeader
            title={'Four steps from\ncall to closure.'}
            lead="The goal is not to replace the most parts. It is to fix the actual fault and leave a record of what was done."
          />
          <ProcessGrid>
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <Step key={step.title}>
                  <Icon size={19} strokeWidth={1.6} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Step>
              );
            })}
          </ProcessGrid>
        </div>
      </Process>

      <CTASection
        eyebrow="Breakdown support"
        title={'Need a diagnosis?\nStart with what you know.'}
        lead="Send the lift make, floor count, what happens and any display error code. We will tell you the next step."
        note="Emergency response availability depends on your location and service agreement. It is confirmed before dispatch."
      />
    </>
  );
}
