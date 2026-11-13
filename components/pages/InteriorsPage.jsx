'use client';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import StudioPreview from '@/components/sections/StudioPreview';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import CTASection from '@/components/ui/CTASection';
import { cabinFinishes } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Library = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
  scroll-margin-top: 110px;
`;

const Groups = styled.div`
  display: grid;
  gap: 1px;
  margin-top: clamp(32px, 5vw, 52px);
  background: ${colors.line};
  border: 1px solid ${colors.line};

  ${mq.md} { grid-template-columns: 1fr 1fr; }
  ${mq.lg} { grid-template-columns: repeat(3, 1fr); }
`;

const Group = styled.div`
  background: ${colors.porcelain};
  padding: 24px 22px 26px;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${colors.line};

  h3 {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${colors.ink};
  }
  span {
    font-size: 9px;
    color: ${colors.muted};
    letter-spacing: 0.12em;
  }
`;

const SwatchList = styled.ul`
  display: grid;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12.5px;
    color: ${colors.charcoal};
  }
`;

const Swatch = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 1px solid rgba(14, 28, 24, 0.16);
  flex-shrink: 0;
  box-shadow: inset 0 0 0 3px ${colors.porcelain};
`;

const Philosophy = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 124px) 0;
`;

const Columns = styled.div`
  display: grid;
  gap: 30px;
  margin-top: clamp(30px, 4vw, 48px);

  ${mq.md} { grid-template-columns: repeat(3, 1fr); }
`;

const Column = styled.div`
  border-top: 1px solid rgba(14, 28, 24, 0.18);
  padding-top: 20px;

  h3 {
    font-size: 1.08rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.7;
    color: ${colors.muted};
  }
`;

const Sequence = styled.section`
  background: ${colors.forest};
  color: ${colors.porcelain};
  padding: clamp(68px, 8vw, 116px) 0;
`;

const Steps = styled.ol`
  display: grid;
  gap: 0;
  margin-top: clamp(30px, 4vw, 48px);
  border-top: 1px solid rgba(244, 246, 242, 0.16);

  ${mq.md} { grid-template-columns: repeat(4, 1fr); }
`;

const Step = styled.li`
  padding: 22px 0;
  border-bottom: 1px solid rgba(244, 246, 242, 0.16);

  ${mq.md} {
    padding: 24px 22px;
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
    margin-top: 6px;
    font-size: 12.5px;
    line-height: 1.65;
    color: rgba(244, 246, 242, 0.58);
  }
`;

const Note = styled.p`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 26px;
  font-size: 11.5px;
  line-height: 1.65;
  color: rgba(244, 246, 242, 0.46);
  max-width: 74ch;

  svg { color: ${colors.turquoise}; flex-shrink: 0; margin-top: 2px; }
`;

const GROUPS = [
  { key: 'wall', label: 'Wall panels' },
  { key: 'floor', label: 'Flooring' },
  { key: 'ceiling', label: 'Ceiling' },
  { key: 'light', label: 'Lighting' },
  { key: 'rail', label: 'Handrails' },
  { key: 'door', label: 'Doors' },
];

export default function InteriorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Interiors & customization"
        title={'The cabin is the\nclosest room.'}
        lead="Walls, floor, ceiling, light and metal are experienced at arm’s length. The studio below is a way to explore combinations before they become a specification."
        image="/images/details/ceiling-light.jpg"
        imageAlt="Concept render of a backlit teal elevator ceiling with warm downlights"
        index="07 — Interiors"
        meta={[
          { label: 'Layers', value: 'Walls · floor · ceiling · light · metal' },
          { label: 'Preview', value: '360° concept studio' },
          { label: 'Final step', value: 'Physical sample approval' },
        ]}
        breadcrumbs={[{ name: 'Interiors', href: '/interiors' }]}
      />

      <div id="explore" />
      <div id="studio" />
      <StudioPreview
        mode="studio"
        eyebrow="Design studio"
        title={'Choose a finish.\nSee it in the cabin.'}
        lead="Orbit the cabin and change six layers in real time. This is a conceptual preview — the specification follows site measurement and sample approval."
      />

      <Library id="finishes">
        <div className="container">
          <SectionHeader
            eyebrow="Material library"
            title={'A starting palette,\nnot a straitjacket.'}
            lead="These are the directions we work with most often. Availability changes by supplier and project, so every selection is confirmed against current samples."
          />
          <Groups>
            {GROUPS.map((group) => (
              <Group key={group.key}>
                <GroupHead>
                  <h3>{group.label}</h3>
                  <span>{String(cabinFinishes[group.key].length).padStart(2, '0')} options</span>
                </GroupHead>
                <SwatchList>
                  {cabinFinishes[group.key].map((option) => (
                    <li key={option.id}>
                      <Swatch $color={option.swatch} aria-hidden="true" />
                      {option.name}
                    </li>
                  ))}
                </SwatchList>
              </Group>
            ))}
          </Groups>
        </div>
      </Library>

      <Philosophy>
        <div className="container">
          <Eyebrow>Design considerations</Eyebrow>
          <SectionHeader
            title={'Three decisions that\nage differently.'}
            lead="A cabin can look excellent on handover and tired in two years. These are the trade-offs we discuss early."
          />
          <Columns>
            <Column>
              <h3>Touch and maintenance</h3>
              <p>
                High-touch surfaces collect fingerprints and cleaning marks. Brushed, grained
                and matte finishes usually age more gracefully than mirror-polished panels.
              </p>
            </Column>
            <Column>
              <h3>Light and colour</h3>
              <p>
                A warm 3000K ceiling makes timber and bronze feel richer; cooler light suits
                stainless steel and clinical cabins. The choice changes the perceived size of
                the car.
              </p>
            </Column>
            <Column>
              <h3>Weight and structure</h3>
              <p>
                Stone floors and heavy panels affect car weight and door operation. We check
                the finished load, not just the material sample.
              </p>
            </Column>
          </Columns>
        </div>
      </Philosophy>

      <Sequence>
        <div className="container">
          <SectionHeader
            eyebrow="From idea to approved sample"
            title={'Four steps before\nfabrication.'}
            lead="Concept images are useful for direction. Fabrication starts only after the physical sample and shop drawing are approved."
            tone="dark"
          />
          <Steps>
            <Step>
              <span>01</span>
              <h3>Direction</h3>
              <p>Mood, palette and practical constraints agreed with the design team.</p>
            </Step>
            <Step>
              <span>02</span>
              <h3>Sample</h3>
              <p>Physical material samples reviewed under the building’s actual lighting.</p>
            </Step>
            <Step>
              <span>03</span>
              <h3>Drawing</h3>
              <p>Panel layout, joints, fixture positions and weights confirmed.</p>
            </Step>
            <Step>
              <span>04</span>
              <h3>Approval</h3>
              <p>Signed sample and drawing release the cabin for fabrication.</p>
            </Step>
          </Steps>
          <Note>
            <Check size={14} />
            Concept visuals on this site are illustrative. They do not represent a manufactured
            catalogue and are not photographs of completed installations.
          </Note>
        </div>
      </Sequence>

      <CTASection
        eyebrow="Cabin design"
        title={'Have a palette\nin mind?'}
        lead="Share reference images, the building type and the cabin size. We will tell you what is practical to build and what needs a sample."
      />
    </>
  );
}
