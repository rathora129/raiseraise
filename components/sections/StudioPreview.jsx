'use client';
import styled from 'styled-components';
import { Hand, Layers, ScanEye } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CabinExperience from '@/components/three/CabinExperience';
import Button from '@/components/ui/Button';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  position: relative;
  background:
    radial-gradient(90% 70% at 15% 0%, rgba(39, 134, 114, 0.2), transparent 60%),
    ${colors.forestDeep};
  color: ${colors.porcelain};
  padding: clamp(72px, 9vw, 128px) 0;
  overflow: hidden;
`;

const Head = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: clamp(34px, 5vw, 58px);

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    align-items: end;
  }
`;

const Legend = styled.ul`
  display: grid;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(244, 246, 242, 0.16);

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: rgba(244, 246, 242, 0.66);
  }

  svg {
    color: ${colors.turquoise};
    flex-shrink: 0;
  }
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid rgba(244, 246, 242, 0.12);
`;

const Note = styled.p`
  font-size: 11px;
  line-height: 1.6;
  color: rgba(244, 246, 242, 0.42);
  max-width: 56ch;
`;

export default function StudioPreview({
  mode = 'explore',
  eyebrow = 'Cabin experience',
  title = 'Step inside before\nyou decide.',
  lead = 'Orbit a concept cabin, then change the walls, floor, ceiling and lighting. It is a design conversation you can have from your phone.',
}) {
  const studio = mode === 'studio';
  return (
    <Section id="studio-preview">
      <div className="container">
        <Head>
          <SectionHeader eyebrow={eyebrow} title={title} lead={lead} tone="dark" />
          <Legend>
            <li>
              <ScanEye size={16} />
              {studio ? 'Live finish preview' : '360° cabin orbit'}
            </li>
            <li>
              <Hand size={16} />
              Drag on desktop or touch
            </li>
            <li>
              <Layers size={16} />
              {studio ? 'Six material layers' : 'Concept geometry, not a catalogue model'}
            </li>
          </Legend>
        </Head>
        <Reveal y={34}>
          <CabinExperience mode={mode} />
        </Reveal>
        <Foot>
          <Note>
            Conceptual visualisation for design discussion. Proportions, materials and
            lighting options are confirmed after site measurement and sample approval.
          </Note>
          {!studio && (
            <Button href="/interiors#studio" variant="outlineDark">
              Open the design studio
            </Button>
          )}
        </Foot>
      </div>
    </Section>
  );
}
