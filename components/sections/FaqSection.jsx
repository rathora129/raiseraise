'use client';
import styled from 'styled-components';
import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import { faqs } from '@/lib/content';
import { whatsappLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 36px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    gap: 72px;
    align-items: start;
  }
`;

const Side = styled.div`
  display: grid;
  gap: 22px;

  ${mq.lg} { position: sticky; top: 120px; }
`;

const Aside = styled.p`
  font-size: 12.5px;
  line-height: 1.7;
  color: ${colors.muted};
  max-width: 36ch;
`;

const AsideLink = styled.a`
  color: ${colors.emerald};
  border-bottom: 1px solid rgba(39, 134, 114, 0.35);
  padding-bottom: 1px;

  &:hover { border-color: ${colors.emerald}; }
`;

export default function FaqSection({
  items = faqs,
  eyebrow = 'Questions, answered',
  title = 'What people ask\nbefore they commit.',
  lead = 'Straight answers about scope, site checks and what happens after handover. If something is not confirmed, we say so.',
  id = 'faq',
}) {
  return (
    <Section id={id}>
      <div className="container">
        <Grid>
          <Side>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              lead={lead}
              size="clamp(2rem, 3.3vw, 3.3rem)"
            />
            <Aside>
              Still unsure? Send the building type, floor count and location on{' '}
              <AsideLink
                href={whatsappLink('Hello RaiseRaise Elevators, I have a question about an elevator requirement.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </AsideLink>{' '}
              and we will reply with what we need to know.
            </Aside>
          </Side>
          <Reveal y={22}>
            <Accordion items={items} />
          </Reveal>
        </Grid>
      </div>
    </Section>
  );
}
