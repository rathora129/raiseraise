'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import WordmarkLogo from '@/components/brand/WordmarkLogo';
import { nav, site, whatsappLink, telLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const featureMedia = {
  Elevators: {
    src: '/images/cabins/passenger-cabin.jpg',
    alt: 'Concept render of a luxury passenger elevator cabin',
    label: 'Cabin study 01',
  },
  Interiors: {
    src: '/images/details/ceiling-light.jpg',
    alt: 'Concept render of a backlit elevator ceiling',
    label: 'Interior study 02',
  },
  Services: {
    src: '/images/engineering/shaft.jpg',
    alt: 'Concept render of an elevator shaft under installation',
    label: 'Engineering study 03',
  },
};

const Shell = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: ${colors.white};
  background: ${(p) => (p.$scrolled || p.$open ? 'rgba(5, 26, 21, 0.86)' : 'transparent')};
  backdrop-filter: ${(p) => (p.$scrolled || p.$open ? 'blur(18px) saturate(1.2)' : 'none')};
  border-bottom: 1px solid ${(p) => (p.$scrolled || p.$open ? 'rgba(255,255,255,0.09)' : 'transparent')};
  transition: background 420ms ease, border-color 420ms ease, backdrop-filter 420ms ease;
`;

const Utility = styled.div`
  display: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  max-height: ${(p) => (p.$scrolled ? '0px' : '40px')};
  overflow: hidden;
  opacity: ${(p) => (p.$scrolled ? 0 : 1)};
  transition: max-height 420ms ease, opacity 300ms ease;

  ${mq.lg} { display: block; }
`;

const UtilityInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 34px;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.55);

  a { transition: color 200ms ease; }
  a:hover { color: ${colors.turquoiseSoft}; }
  span { display: inline-flex; align-items: center; gap: 8px; }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: ${(p) => (p.$scrolled ? '70px' : '84px')};
  transition: height 420ms ease;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: clamp(18px, 2.2vw, 34px);
  height: 100%;

  ${mq.lg} { display: flex; }
`;

const NavItem = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const navLinkStyle = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 550;
  letter-spacing: 0.02em;
  color: rgba(244, 246, 242, 0.78);
  padding: 8px 0;
  transition: color 220ms ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 1px;
    background: ${colors.turquoise};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover, &[aria-expanded='true'] { color: ${colors.white}; }
  &:hover::after, &[aria-expanded='true']::after { transform: scaleX(1); }
`;

const NavLink = styled(Link)`${navLinkStyle}`;
const NavButton = styled.button`${navLinkStyle}`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PhoneLink = styled.a`
  display: none;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(244, 246, 242, 0.72);
  padding: 10px;
  transition: color 200ms ease;

  &:hover { color: ${colors.turquoiseSoft}; }

  ${mq.xl} { display: inline-flex; }
`;

const QuoteButton = styled.a`
  display: none;
  align-items: center;
  gap: 10px;
  background: ${colors.emerald};
  color: ${colors.white};
  padding: 12px 18px;
  border-radius: 3px;
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background 260ms ease, transform 260ms ease;

  &:hover { background: ${colors.emeraldDeep}; transform: translateY(-1px); }

  ${mq.md} { display: inline-flex; }
`;

const Burger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: ${colors.white};
  transition: background 200ms ease, color 200ms ease;

  &:hover { background: rgba(255, 255, 255, 0.08); }

  ${mq.lg} { display: none; }
`;

const Mega = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: rgba(5, 26, 21, 0.97);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(22px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  ${mq.lg} { display: block; }
`;

const MegaInner = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 56px;
  padding-top: 34px;
  padding-bottom: 34px;
`;

const MegaTitle = styled.p`
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.4);
  margin-bottom: 18px;
`;

const MegaLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 32px;
`;

const MegaLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 13.5px;
  color: rgba(244, 246, 242, 0.8);
  transition: color 200ms ease, padding 320ms ease;

  svg { opacity: 0; transform: translateX(-6px); transition: 260ms ease; }
  &:hover { color: ${colors.white}; padding-left: 6px; }
  &:hover svg { opacity: 1; transform: translateX(0); color: ${colors.turquoise}; }
`;

const Feature = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  min-height: 190px;
  background: ${colors.forestDeep};

  img { object-fit: cover; transition: transform 900ms cubic-bezier(0.16,1,0.3,1); }
  &:hover img { transform: scale(1.04); }
`;

const FeatureLabel = styled.span`
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 7px 10px;
  background: rgba(4, 23, 19, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.85);
`;

const MobileShell = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: ${colors.forest};
  color: ${colors.porcelain};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px clamp(20px, 4vw, 64px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileClose = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const MobileNav = styled.nav`
  padding: 26px clamp(20px, 4vw, 64px) 10px;
  flex: 1;
`;

const MobileItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
`;

const MobileLinkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 20px 0;
  font-size: clamp(1.65rem, 7vw, 2.4rem);
  letter-spacing: -0.04em;
  font-weight: 500;
  line-height: 1.1;
  color: ${colors.porcelain};

  span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: ${colors.turquoise};
    font-weight: 600;
  }
`;

const MobileToggle = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  svg { transition: transform 300ms ease; transform: rotate(${(p) => (p.$open ? '180deg' : '0')}); }
`;

const MobileSub = styled(motion.div)`
  overflow: hidden;
`;

const MobileSubLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 0 11px 26px;
  font-size: 14px;
  color: rgba(244, 246, 242, 0.68);

  &::before {
    content: '';
    width: 14px;
    height: 1px;
    background: rgba(75, 194, 172, 0.6);
  }
`;

const MobileFoot = styled.div`
  padding: 28px clamp(20px, 4vw, 64px) 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  gap: 14px;
`;

const MobileContact = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(244, 246, 242, 0.82);

  svg { color: ${colors.turquoise}; }
  small {
    display: block;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.4);
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const pathname = usePathname();
  const mobileRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', mobileOpen);
    return () => document.body.classList.remove('is-locked');
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const el = mobileRef.current;
    const focusables = el?.querySelectorAll('a[href], button:not([disabled])');
    focusables?.[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
      if (e.key !== 'Tab' || !focusables?.length) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const keepOpen = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const activeMega = nav.find((item) => item.label === openMenu);
  const feature = openMenu ? featureMedia[openMenu] : null;

  return (
    <>
      <Shell $scrolled={scrolled} $open={!!openMenu}>
        <Utility $scrolled={scrolled}>
          <div className="container">
            <UtilityInner>
              <span>{site.tagline}</span>
              <span>
                <MessageCircle size={11} aria-hidden="true" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsappDisplay}
                </a>
              </span>
            </UtilityInner>
          </div>
        </Utility>

        <div className="container">
          <Bar $scrolled={scrolled}>
            <WordmarkLogo dark href="/" compact={scrolled} />

            <DesktopNav
              aria-label="Main navigation"
              onMouseLeave={scheduleClose}
            >
              {nav.map((item) => (
                <NavItem
                  key={item.label}
                  onMouseEnter={() => {
                    keepOpen();
                    if (item.children) setOpenMenu(item.label);
                    else setOpenMenu(null);
                  }}
                  onFocus={() => item.children && setOpenMenu(item.label)}
                >
                  {item.children ? (
                    <NavButton
                      type="button"
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown size={12} strokeWidth={1.6} aria-hidden="true" />
                    </NavButton>
                  ) : (
                    <NavLink href={item.href}>{item.label}</NavLink>
                  )}
                </NavItem>
              ))}
            </DesktopNav>

            <Right>
              {telLink && (
                <PhoneLink href={telLink} aria-label={`Call ${site.phoneDisplay}`}>
                  <Phone size={14} strokeWidth={1.6} />
                  {site.phoneDisplay}
                </PhoneLink>
              )}
              <QuoteButton href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Get a quote
              </QuoteButton>
              <Burger
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={18} strokeWidth={1.5} />
              </Burger>
            </Right>
          </Bar>
        </div>

        <AnimatePresence>
          {activeMega && feature && (
            <Mega
              key={activeMega.label}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={keepOpen}
              onMouseLeave={scheduleClose}
            >
              <div className="container">
                <MegaInner>
                  <div>
                    <MegaTitle>Explore {activeMega.label.toLowerCase()}</MegaTitle>
                    <MegaLinks>
                      {activeMega.children.map((child) => (
                        <MegaLink key={child.href} href={child.href} onClick={() => setOpenMenu(null)}>
                          {child.label}
                          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                        </MegaLink>
                      ))}
                    </MegaLinks>
                  </div>
                  <Feature href={activeMega.href}>
                    <Image src={feature.src} alt={feature.alt} fill sizes="(max-width: 1080px) 40vw, 480px" quality={80} />
                    <FeatureLabel>{feature.label}</FeatureLabel>
                  </Feature>
                </MegaInner>
              </div>
            </Mega>
          )}
        </AnimatePresence>
      </Shell>

      <AnimatePresence>
        {mobileOpen && (
          <MobileShell
            ref={mobileRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <MobileTop>
              <WordmarkLogo dark href="/" compact />
              <MobileClose type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={18} strokeWidth={1.5} />
              </MobileClose>
            </MobileTop>
            <MobileNav aria-label="Mobile main navigation">
              {nav.map((item, i) => {
                const isOpen = mobileSection === item.label;
                return (
                  <MobileItem key={item.label}>
                    <MobileLinkRow>
                      {item.children ? (
                        <>
                          <MobileLink href={item.href} onClick={() => setMobileOpen(false)}>
                            <span>{String(i + 1).padStart(2, '0')}</span>
                            {item.label}
                          </MobileLink>
                          <MobileToggle
                            type="button"
                            $open={isOpen}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} links`}
                            onClick={() => setMobileSection(isOpen ? null : item.label)}
                          >
                            <ChevronDown size={14} strokeWidth={1.6} />
                          </MobileToggle>
                        </>
                      ) : (
                        <MobileLink href={item.href} onClick={() => setMobileOpen(false)}>
                          <span>{String(i + 1).padStart(2, '0')}</span>
                          {item.label}
                        </MobileLink>
                      )}
                    </MobileLinkRow>
                    {item.children && (
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <MobileSub
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {item.children.map((child) => (
                              <MobileSubLink key={child.href} href={child.href} onClick={() => setMobileOpen(false)}>
                                {child.label}
                              </MobileSubLink>
                            ))}
                          </MobileSub>
                        )}
                      </AnimatePresence>
                    )}
                  </MobileItem>
                );
              })}
            </MobileNav>
            <MobileFoot>
              <MobileContact href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} strokeWidth={1.5} />
                <span>
                  <small>WhatsApp</small>
                  {site.whatsappDisplay}
                </span>
              </MobileContact>
              {telLink && (
                <MobileContact href={telLink}>
                  <Phone size={18} strokeWidth={1.5} />
                  <span>
                    <small>Call</small>
                    {site.phoneDisplay}
                  </span>
                </MobileContact>
              )}
              <QuoteButton
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', justifyContent: 'center', marginTop: 8 }}
              >
                Request a quote
              </QuoteButton>
            </MobileFoot>
          </MobileShell>
        )}
      </AnimatePresence>
    </>
  );
}
