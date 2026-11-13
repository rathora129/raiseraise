'use client';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { footerNav, site, whatsappLink, telLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Foot = styled.footer`
  background: ${colors.forestDeep};
  color: ${colors.porcelain};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: clamp(56px, 7vw, 96px);
  position: relative;
  overflow: hidden;
`;

const Top = styled.div`
  display: grid;
  gap: 48px;

  ${mq.lg} {
    grid-template-columns: minmax(300px, 1.15fr) minmax(0, 1.85fr);
    gap: 80px;
  }
`;

const Brand = styled.div`
  display: grid;
  gap: 24px;
  align-content: start;
`;

const LogoWrap = styled(Link)`
  display: inline-block;
  width: 168px;

  img { width: 100%; height: auto; }
`;

const Tagline = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(244, 246, 242, 0.6);
  max-width: 32ch;
`;

const Contact = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 4px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(244, 246, 242, 0.78);
  transition: color 200ms ease;
  width: fit-content;

  svg { color: ${colors.turquoise}; flex-shrink: 0; }
  &:hover { color: ${colors.white}; }
`;

const Pending = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(244, 246, 242, 0.38);

  svg { flex-shrink: 0; opacity: 0.7; }
  em {
    font-style: normal;
    font-size: 8px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 2px 5px;
    margin-left: 2px;
  }
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px 24px;

  ${mq.sm} { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  ${mq.lg} { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; }
`;

const NavCol = styled.div`
  display: grid;
  gap: 14px;
  align-content: start;
  padding-top: 6px;
`;

const ColTitle = styled.h3`
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(244, 246, 242, 0.38);
  margin-bottom: 4px;
`;

const FLink = styled(Link)`
  font-size: 13px;
  color: rgba(244, 246, 242, 0.72);
  width: fit-content;
  transition: color 200ms ease, transform 260ms ease;

  &:hover { color: ${colors.turquoiseSoft}; transform: translateX(3px); }
`;

const Giant = styled.div`
  margin-top: clamp(48px, 7vw, 90px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 26px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  span {
    font-size: clamp(3.4rem, 13.4vw, 13rem);
    line-height: 0.8;
    letter-spacing: -0.06em;
    font-weight: 550;
    color: transparent;
    -webkit-text-stroke: 1px rgba(244, 246, 242, 0.16);
    user-select: none;
    white-space: nowrap;
  }
`;

const Up = styled.a`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 8px;
  transition: background 240ms ease, color 240ms ease, transform 240ms ease;
  color: ${colors.porcelain};

  &:hover { background: ${colors.turquoise}; color: ${colors.forest}; transform: translateY(-3px); }
`;

const Bottom = styled.div`
  margin-top: 32px;
  padding: 22px 78px 28px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  gap: 14px;
  font-size: 10.5px;
  line-height: 1.7;
  color: rgba(244, 246, 242, 0.38);

  ${mq.md} {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const Legal = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  align-items: center;

  a { transition: color 200ms ease; }
  a:hover { color: rgba(244, 246, 242, 0.7); }
`;

export default function Footer() {
  return (
    <Foot>
      <div className="container">
        <Top>
          <Brand>
            <LogoWrap href="/" aria-label="RaiseRaise Elevators — home">
              <Image
                src="/images/brand/raiseraise-logo-dark.svg"
                alt="RaiseRaise Elevators"
                width={302}
                height={412}
                style={{ width: '100%', height: 'auto' }}
              />
            </LogoWrap>
            <Tagline>
              {site.tagline} Elevators, installation and care for residential,
              commercial and industrial buildings.
            </Tagline>
            <Contact>
              <ContactLink href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} strokeWidth={1.6} />
                WhatsApp {site.whatsappDisplay}
              </ContactLink>
              {telLink && (
                <ContactLink href={telLink}>
                  <Phone size={15} strokeWidth={1.6} />
                  {site.phoneDisplay}
                </ContactLink>
              )}
              {site.email ? (
                <ContactLink href={`mailto:${site.email}`}>
                  <Mail size={15} strokeWidth={1.6} />
                  {site.email}
                </ContactLink>
              ) : (
                <Pending>
                  <Mail size={15} strokeWidth={1.6} />
                  Email — to be confirmed <em>Pending</em>
                </Pending>
              )}
              {site.address ? (
                <ContactLink href={site.mapsUrl || '/contact'}>
                  <MapPin size={15} strokeWidth={1.6} />
                  {site.address}
                </ContactLink>
              ) : (
                <Pending>
                  <MapPin size={15} strokeWidth={1.6} />
                  Office address — to be confirmed <em>Pending</em>
                </Pending>
              )}
            </Contact>
          </Brand>

          <NavGrid>
            {footerNav.map((col) => (
              <NavCol key={col.title}>
                <ColTitle>{col.title}</ColTitle>
                {col.links.map((link) => (
                  <FLink key={link.label} href={link.href}>{link.label}</FLink>
                ))}
              </NavCol>
            ))}
          </NavGrid>
        </Top>

        <Giant>
          <span aria-hidden="true">RaiseRaise</span>
          <Up href="#top" aria-label="Back to top">
            <ArrowUp size={18} strokeWidth={1.5} />
          </Up>
        </Giant>

        <Bottom>
          <Legal>
            <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
            <span>
              Imagery is illustrative unless labelled as a client project. Specifications,
              availability and coverage are confirmed per project.
            </span>
          </Legal>
          <Legal>
            <Link href="/contact">Enquiries</Link>
            <Link href="/#faq">FAQs</Link>
            <span style={{ color: 'rgba(75,194,172,0.7)' }}>Crafted with care</span>
          </Legal>
        </Bottom>
      </div>
    </Foot>
  );
}
