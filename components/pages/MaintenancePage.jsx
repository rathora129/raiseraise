'use client';
import styled from 'styled-components';
import { Check, ClipboardCheck, Clock3, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CTASection from '@/components/ui/CTASection';
import { maintenanceChecks } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Plans = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const PlanGrid = styled.div`
  display: grid;
  gap: 14px;
  margin-top: clamp(32px, 5vw, 52px);

  ${mq.md} { grid-template-columns: repeat(3, 1fr); }
`;

const Plan = styled.div`
  background: ${colors.porcelainDeep};
  border: 1px solid rgba(14, 28, 24, 0.1);
  padding: clamp(24px, 3vw, 34px);
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${(p) =>
    p.$featured &&
    `
    background: ${colors.forest};
    color: ${colors.porcelain};
    border-color: ${colors.forest};
  `}
`;

const PlanIndex = styled.span`
  font-size: 9px;
  letter-spacing: 0.22em;
  color: ${(p) => (p.$featured ? colors.turquoiseSoft : colors.emerald)};
`;

const PlanTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

const PlanLead = styled.p`
  font-size: 12.5px;
  line-height: 1.7;
  color: ${(p) => (p.$featured ? 'rgba(244, 246, 242, 0.66)' : colors.muted)};
`;

const PlanList = styled.ul`
  display: grid;
  gap: 8px;
  margin-top: 4px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 12.5px;
    line-height: 1.55;
    color: ${(p) => (p.$featured ? 'rgba(244, 246, 242, 0.78)' : colors.charcoal)};
  }

  svg { color: ${(p) => (p.$featured ? colors.turquoise : colors.emerald)}; flex-shrink: 0; margin-top: 3px; }
`;

const PlanFoot = styled.div`
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid ${(p) => (p.$featured ? 'rgba(244, 246, 242, 0.16)' : colors.line)};
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => (p.$featured ? 'rgba(244, 246, 242, 0.5)' : colors.muted)};
`;

const Checks = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const CheckGrid = styled.ul`
  display: grid;
  gap: 0;
  margin-top: clamp(30px, 4vw, 46px);
  border-top: 1px solid ${colors.line};

  ${mq.md} { grid-template-columns: 1fr 1fr; column-gap: 64px; }
`;

const CheckItem = styled.li`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.line};
  font-size: 13.5px;
  line-height: 1.55;
  color: ${colors.charcoal};

  span {
    font-size: 9px;
    letter-spacing: 0.14em;
    color: ${colors.emerald};
    padding-top: 3px;
  }
`;

const Terms = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(64px, 8vw, 112px) 0;
`;

const TermsGrid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: clamp(28px, 4vw, 44px);

  ${mq.md} { grid-template-columns: repeat(3, 1fr); }
`;

const Term = styled.div`
  border-top: 1px solid ${colors.line};
  padding-top: 20px;

  svg { color: ${colors.emerald}; }
  h3 {
    margin-top: 12px;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 7px;
    font-size: 12.5px;
    line-height: 1.65;
    color: ${colors.muted};
  }
`;

const PLANS = [
  {
    index: '01',
    title: 'Preventive maintenance',
    lead: 'Scheduled visits for buildings that need a consistent routine without a comprehensive parts commitment.',
    items: ['Planned inspection visits', 'Lubrication and adjustment', 'Door and levelling checks', 'Fault-log review and report'],
    foot: 'Wear parts billed separately',
  },
  {
    index: '02',
    title: 'Comprehensive AMC',
    featured: true,
    lead: 'A defined set of preventive work and wear items covered under one agreement, with exclusions written down.',
    items: ['Everything in preventive care', 'Agreed wear parts included', 'Priority scheduling', 'Documented visit records'],
    foot: 'Scope & exclusions agreed in writing',
  },
  {
    index: '03',
    title: 'Non-comprehensive AMC',
    lead: 'Labour and expertise for scheduled care, with replacement parts approved and billed as they arise.',
    items: ['Scheduled inspection visits', 'Labour for adjustments', 'Repair diagnosis', 'Parts quoted before fitting'],
    foot: 'Parts approved case by case',
  },
];

const TERMS = [
  {
    icon: ClipboardCheck,
    title: 'A written scope',
    text: 'Visit frequency, response terms, inclusions and exclusions are stated in the agreement — not summarised on a sales call.',
  },
  {
    icon: Clock3,
    title: 'Response depends on location',
    text: 'Emergency response times vary by city and contract. We confirm what can be committed before you sign.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety is not optional',
    text: 'If a defect affects safe operation, we isolate and report it. A maintenance plan does not override safety.',
  },
];

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance & AMC"
        title={'A quiet lift is\nmaintained, not lucky.'}
        lead="Planned care keeps doors aligned, levelling accurate and faults visible before they become breakdowns. The agreement should say exactly what that means."
        image="/images/engineering/machine-room.jpg"
        imageAlt="Concept render of a clean machine room with a traction machine and controller"
        index="04 — Service"
        meta={[
          { label: 'Plans', value: 'Preventive · Comprehensive · Non-comprehensive' },
          { label: 'Checks', value: 'Mechanical, electrical & safety' },
          { label: 'Records', value: 'Visit report per service' },
        ]}
        breadcrumbs={[
          { name: 'Services', href: '/installation' },
          { name: 'Maintenance & AMC', href: '/maintenance' },
        ]}
      />

      <Plans>
        <div className="container">
          <SectionHeader
            eyebrow="Maintenance structures"
            title={'Three ways to care\nfor the same lift.'}
            lead="The right structure depends on traffic, age, budget and how much certainty the building wants. We quote each one with a written scope."
          />
          <PlanGrid>
            {PLANS.map((plan, index) => (
              <Reveal key={plan.title} delay={index * 0.06} y={24}>
                <Plan $featured={plan.featured}>
                  <PlanIndex $featured={plan.featured}>{plan.index}</PlanIndex>
                  <PlanTitle>{plan.title}</PlanTitle>
                  <PlanLead $featured={plan.featured}>{plan.lead}</PlanLead>
                  <PlanList $featured={plan.featured}>
                    {plan.items.map((item) => (
                      <li key={item}>
                        <Check size={13} strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </PlanList>
                  <PlanFoot $featured={plan.featured}>{plan.foot}</PlanFoot>
                </Plan>
              </Reveal>
            ))}
          </PlanGrid>
        </div>
      </Plans>

      <Checks>
        <div className="container">
          <SectionHeader
            eyebrow="What gets checked"
            title={'A visit is a list,\nnot a glance.'}
            lead="The exact checklist follows the equipment, but these are the areas a preventive visit is built around."
          />
          <CheckGrid>
            {maintenanceChecks.map((item, index) => (
              <CheckItem key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item}
              </CheckItem>
            ))}
          </CheckGrid>
        </div>
      </Checks>

      <Terms>
        <div className="container">
          <Eyebrow>Before you sign</Eyebrow>
          <SectionHeader
            title={'Three things a good\nAMC makes clear.'}
            lead="A maintenance contract is a long relationship. It should be as specific as the equipment it covers."
          />
          <TermsGrid>
            {TERMS.map((term) => {
              const Icon = term.icon;
              return (
                <Term key={term.title}>
                  <Icon size={19} strokeWidth={1.6} />
                  <h3>{term.title}</h3>
                  <p>{term.text}</p>
                </Term>
              );
            })}
          </TermsGrid>
          <div style={{ marginTop: 30 }}>
            <Button href="/contact" variant="ink">
              Request an AMC proposal
            </Button>
          </div>
        </div>
      </Terms>

      <CTASection
        eyebrow="Existing lift?"
        title={'Already have a lift\nsomeone else installed?'}
        lead="Share the make, model, age and recent fault history. We will tell you what can be maintained and what should be modernized."
        note="We do not claim to service every brand. Compatibility is confirmed after reviewing the equipment."
      />
    </>
  );
}
