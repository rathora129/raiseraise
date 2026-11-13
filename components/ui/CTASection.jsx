'use client';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import Button from './Button';
import Eyebrow from './Eyebrow';
import Mark from '@/components/brand/Mark';
import { whatsappLink, site, telLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 100% at 85% 10%, rgba(75, 194, 172, 0.16) 0%, transparent 55%),
    linear-gradient(160deg, ${colors.forest} 0%, ${colors.forestDeep} 100%);
  color: ${colors.porcelain};
  padding: clamp(72px, 10vw, 130px) 0;
  isolation: isolate;
`;

const MarkLayer = styled.div`
  position: absolute;
  right: -6%;
  bottom: -30%;
  width: clamp(320px, 46vw, 720px);
  opacity: 0.06;
  transform: rotate(8deg);
  pointer-events: none;
  z-index: -1;
`;

const Inner = styled.div`
  display: grid;
  gap: 42px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
    align-items: end;
    gap: 90px;
  }
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 5.6vw, 5.2rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
  font-weight: 550;
  margin-top: 22px;

  em { font-style: normal; color: ${colors.turquoiseSoft}; }
`;

const Lead = styled.p`
  margin-top: 22px;
  max-width: 52ch;
  color: rgba(244, 246, 242, 0.7);
  font-size: clamp(0.98rem, 1.2vw, 1.08rem);
  line-height: 1.65;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Note = styled.p`
  margin-top: 18px;
  font-size: 11px;
  line-height: 1.6;
  color: rgba(244, 246, 242, 0.4);
  max-width: 40ch;
`;

const ContactCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 26px;
  display: grid;
  gap: 18px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(6px);
`;

const contactStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child { border-bottom: 0; padding-bottom: 0; }
  span { display: grid; gap: 2px; }
  small {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.42);
  }
  strong {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  svg { color: ${colors.turquoise}; flex-shrink: 0; }
`;

const ContactRow = styled.a`${contactStyle}`;
const ContactLink = styled(Link)`${contactStyle}`;

export default function CTASection({
  eyebrow = 'Start a conversation',
  title = 'Tell us about\nyour building.',
  lead = 'Share the building type, floor count and any drawings you have. We will tell you what we need to know and what happens next — no obligation.',
  note = 'Product availability and service coverage are confirmed for each project after a site review.',
}) {
  return (
    <Section>
      <MarkLayer aria-hidden="true"><Mark size={720} /></MarkLayer>
      <div className="container">
        <Inner>
          <div>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <Title dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />
            <Lead>{lead}</Lead>
            <Actions style={{ marginTop: 30 }}>
              <Button href={whatsappLink()} variant="primary">
                <MessageCircle size={14} style={{ marginRight: 8, verticalAlign: -2 }} />
                WhatsApp us
              </Button>
              {telLink && (
                <Button href={telLink} variant="outlineDark">
                  <Phone size={13} style={{ marginRight: 8, verticalAlign: -2 }} />
                  Call now
                </Button>
              )}
              <Button href="/contact" variant="outlineDark">Contact page</Button>
            </Actions>
            <Note>{note}</Note>
          </div>
          <ContactCard>
            <ContactRow
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <small>WhatsApp</small>
                <strong>{site.whatsappDisplay}</strong>
              </span>
              <MessageCircle size={18} strokeWidth={1.5} />
            </ContactRow>
            {telLink && (
              <ContactRow href={telLink}>
                <span>
                  <small>Call</small>
                  <strong>{site.phoneDisplay}</strong>
                </span>
                <Phone size={18} strokeWidth={1.5} />
              </ContactRow>
            )}
            <ContactLink href="/contact">
              <span>
                <small>Project enquiries</small>
                <strong>Send requirements</strong>
              </span>
              <span aria-hidden="true" style={{ color: colors.turquoise }}>→</span>
            </ContactLink>
          </ContactCard>
        </Inner>
      </div>
    </Section>
  );
}
