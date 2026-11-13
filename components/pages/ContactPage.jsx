'use client';
import { useState } from 'react';
import styled from 'styled-components';
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { site, whatsappLink, telLink } from '@/lib/site';
import { products } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.porcelain};
  color: ${colors.ink};
  padding: clamp(64px, 8vw, 116px) 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;

  ${mq.lg} {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 80px;
    align-items: start;
  }
`;

const Side = styled.div`
  display: grid;
  gap: 26px;
`;

const Cards = styled.div`
  display: grid;
  gap: 1px;
  background: ${colors.line};
  border: 1px solid ${colors.line};
`;

const contactStyle = `
  background: ${colors.porcelain};
  padding: 20px 20px;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  gap: 14px;
  align-items: center;
`;

const Row = styled.a`
  ${contactStyle}
  transition: background 0.25s ease;

  &:hover { background: ${colors.porcelainDeep}; }
  svg { color: ${colors.emerald}; }
`;

const StaticRow = styled.div`
  ${contactStyle}
  svg { color: ${(p) => (p.$pending ? colors.stone : colors.emerald)}; }
`;

const Label = styled.span`
  display: block;
  font-size: 8.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${colors.muted};
`;

const Value = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: ${(p) => (p.$pending ? colors.muted : colors.ink)};
`;

const Pending = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 3px 8px;
  border: 1px dashed rgba(14, 28, 24, 0.24);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.muted};
`;

const MapCard = styled.div`
  position: relative;
  aspect-ratio: 16 / 11;
  background:
    radial-gradient(60% 60% at 60% 40%, rgba(75, 194, 172, 0.16), transparent 65%),
    ${colors.forestDeep};
  border: 1px solid rgba(14, 28, 24, 0.1);
  display: grid;
  place-items: center;
  color: ${colors.porcelain};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(244, 246, 242, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(244, 246, 242, 0.06) 1px, transparent 1px);
    background-size: 38px 38px;
  }
`;

const MapInner = styled.div`
  position: relative;
  text-align: center;
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 24px;
  max-width: 320px;

  svg { color: ${colors.turquoise}; }
  p {
    font-size: 11.5px;
    line-height: 1.65;
    color: rgba(244, 246, 242, 0.6);
  }
  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.4);
  }
`;

const FormWrap = styled.div`
  background: ${colors.porcelainDeep};
  border: 1px solid rgba(14, 28, 24, 0.1);
  padding: clamp(22px, 3.4vw, 40px);
`;

const Form = styled.form`
  display: grid;
  gap: 18px;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 18px;

  ${mq.sm} { grid-template-columns: 1fr 1fr; }
`;

const Field = styled.label`
  display: grid;
  gap: 7px;

  span {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${colors.muted};

    em { color: ${colors.emerald}; font-style: normal; }
  }

  input,
  select,
  textarea {
    width: 100%;
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(14, 28, 24, 0.22);
    border-radius: 0;
    padding: 10px 0;
    font-size: 14px;
    color: ${colors.ink};
    transition: border-color 0.25s ease;

    &:focus {
      outline: none;
      border-color: ${colors.emerald};
    }

    &::placeholder { color: rgba(92, 107, 100, 0.55); }
  }

  textarea {
    resize: vertical;
    min-height: 96px;
    line-height: 1.6;
  }

  select { cursor: pointer; }
`;

const SubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 6px;
  padding-top: 18px;
  border-top: 1px solid rgba(14, 28, 24, 0.14);
`;

const Privacy = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 10.5px;
  line-height: 1.6;
  color: ${colors.muted};
  max-width: 34ch;

  svg { color: ${colors.emerald}; flex-shrink: 0; margin-top: 1px; }
`;

const Status = styled.p`
  margin-top: 14px;
  padding: 12px 14px;
  background: rgba(39, 134, 114, 0.1);
  border-left: 2px solid ${colors.emerald};
  font-size: 12px;
  line-height: 1.6;
  color: ${colors.emeraldInk};
`;

const Next = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(64px, 8vw, 110px) 0;
`;

const NextGrid = styled.div`
  display: grid;
  gap: 26px;
  margin-top: clamp(28px, 4vw, 44px);

  ${mq.md} { grid-template-columns: repeat(3, 1fr); }
`;

const NextStep = styled.div`
  border-top: 1px solid rgba(14, 28, 24, 0.18);
  padding-top: 20px;

  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: ${colors.emerald};
  }
  h3 { margin-top: 12px; font-size: 1.04rem; font-weight: 600; }
  p { margin-top: 6px; font-size: 12.5px; line-height: 1.65; color: ${colors.muted}; }
`;

const PROJECT_TYPES = [
  ...products.map((product) => product.name),
  'Modernization of an existing lift',
  'Maintenance / AMC',
  'Repair / breakdown',
  'Something else',
];

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const city = String(data.get('city') || '').trim();
    const type = String(data.get('type') || '').trim();
    const floors = String(data.get('floors') || '').trim();
    const message = String(data.get('message') || '').trim();

    const lines = [
      'Hello RaiseRaise Elevators, I would like to discuss a project.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      city ? `Location: ${city}` : null,
      type ? `Requirement: ${type}` : null,
      floors ? `Floors: ${floors}` : null,
      '',
      message,
    ].filter((line) => line !== null);

    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setStatus(
      'WhatsApp has opened with your details. If it did not open, use the WhatsApp button above and we will pick it up there.'
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={'Tell us what\nyou’re planning.'}
        lead="A short description is enough to start. We will tell you what can be answered remotely and what needs a site visit."
        image="/images/spaces/lobby-hero.jpg"
        imageAlt="Concept render of a dark elevator lobby with brushed metal doors"
        index="09 — Contact"
        meta={[
          { label: 'WhatsApp', value: site.whatsappDisplay },
          { label: 'Call', value: site.phoneDisplay },
          { label: 'Email & office', value: 'Awaiting confirmation' },
        ]}
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
      >
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
      </PageHero>

      <Section>
        <div className="container">
          <Grid>
            <Side>
              <Eyebrow>Direct lines</Eyebrow>
              <Cards>
                <Row href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} strokeWidth={1.6} />
                  <span>
                    <Label>WhatsApp</Label>
                    <Value>{site.whatsappDisplay}</Value>
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Row>

                {telLink && (
                  <Row href={telLink}>
                    <Phone size={18} strokeWidth={1.6} />
                    <span>
                      <Label>Call</Label>
                      <Value>{site.phoneDisplay}</Value>
                    </span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Row>
                )}

                <StaticRow $pending>
                  <Mail size={18} strokeWidth={1.6} />
                  <span>
                    <Label>Email</Label>
                    <Pending>To be confirmed</Pending>
                  </span>
                  <span />
                </StaticRow>

                <StaticRow $pending>
                  <MapPin size={18} strokeWidth={1.6} />
                  <span>
                    <Label>Office</Label>
                    <Pending>Address to be confirmed</Pending>
                  </span>
                  <span />
                </StaticRow>

                <StaticRow $pending>
                  <Clock size={18} strokeWidth={1.6} />
                  <span>
                    <Label>Working hours</Label>
                    <Pending>To be confirmed</Pending>
                  </span>
                  <span />
                </StaticRow>
              </Cards>

              <MapCard>
                <MapInner>
                  <MapPin size={26} strokeWidth={1.4} />
                  <span>Google Maps</span>
                  <p>
                    The map will be pinned here once the office address is confirmed. We do
                    not publish an unverified location.
                  </p>
                </MapInner>
              </MapCard>
            </Side>

            <Reveal y={24}>
              <FormWrap>
                <SectionHeader
                  eyebrow="Project enquiry"
                  title="Send the essentials."
                  lead="This form composes a WhatsApp message on your device. Nothing is stored on this website."
                  as="h2"
                />

                <Form onSubmit={onSubmit} style={{ marginTop: 26 }}>
                  <FormGrid>
                    <Field>
                      <span>
                        Name <em>*</em>
                      </span>
                      <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
                    </Field>
                    <Field>
                      <span>
                        Phone <em>*</em>
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91"
                        inputMode="tel"
                      />
                    </Field>
                    <Field>
                      <span>Email</span>
                      <input name="email" type="email" autoComplete="email" placeholder="Optional" />
                    </Field>
                    <Field>
                      <span>City / location</span>
                      <input name="city" type="text" placeholder="Where is the building?" />
                    </Field>
                    <Field>
                      <span>Requirement</span>
                      <select name="type" defaultValue="">
                        <option value="" disabled>
                          Select a requirement
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field>
                      <span>Number of floors</span>
                      <input name="floors" type="text" placeholder="e.g. G + 4" />
                    </Field>
                  </FormGrid>

                  <Field>
                    <span>
                      Project notes <em>*</em>
                    </span>
                    <textarea
                      name="message"
                      required
                      placeholder="Building type, intended use, available shaft or drawings, and anything that has already been decided."
                    />
                  </Field>

                  <SubmitRow>
                    <Privacy>
                      <ShieldCheck size={13} />
                      By sending, you agree to be contacted about this enquiry. No data is
                      saved on this site.
                    </Privacy>
                    <Button type="submit" variant="ink">
                      <Send size={13} style={{ marginRight: 8, verticalAlign: -2 }} />
                      Send on WhatsApp
                    </Button>
                  </SubmitRow>

                  {status && <Status role="status">{status}</Status>}
                </Form>
              </FormWrap>
            </Reveal>
          </Grid>
        </div>
      </Section>

      <Next>
        <div className="container">
          <Eyebrow>What happens next</Eyebrow>
          <SectionHeader
            title={'Three steps, no\nsales pressure.'}
            lead="You will know what is missing, what it will take to quote and whether we are the right fit before any commitment."
          />
          <NextGrid>
            <NextStep>
              <span>01</span>
              <h3>A short reply</h3>
              <p>We confirm the details we have and ask for anything missing — drawings, photos or floor count.</p>
            </NextStep>
            <NextStep>
              <span>02</span>
              <h3>A site assessment</h3>
              <p>If the project needs it, we arrange a visit to measure the shaft, headroom, pit and access.</p>
            </NextStep>
            <NextStep>
              <span>03</span>
              <h3>A written scope</h3>
              <p>You receive a configuration and quotation with inclusions, exclusions and next steps clearly stated.</p>
            </NextStep>
          </NextGrid>
        </div>
      </Next>
    </>
  );
}
