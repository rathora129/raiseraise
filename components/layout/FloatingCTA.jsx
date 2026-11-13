'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappLink, telLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Wrap = styled.div`
  position: fixed;
  right: clamp(14px, 2.4vw, 26px);
  bottom: clamp(14px, 2.4vw, 26px);
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  animation: rise 380ms cubic-bezier(0.16, 1, 0.3, 1) both;

  @keyframes rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  ${mq.reduce} {
    animation: none;
  }
`;

const Chat = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 56px;
  height: 56px;
  padding: 0;
  border-radius: 999px;
  background: #1d9e50;
  color: #fff;
  box-shadow: 0 18px 38px rgba(4, 23, 19, 0.28);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.04em;
  transition: transform 260ms ease, background 260ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 50%;
    border: 1px solid rgba(75, 194, 172, 0.7);
    animation: pulse 3.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.65; }
    70% { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  span {
    display: none;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    white-space: nowrap;
    transition: max-width 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease;
  }

  ${mq.md} {
    width: auto;
    padding: 0 20px 0 19px;
    justify-content: flex-start;

    span { display: block; }
    &:hover span, &:focus-visible span { max-width: 150px; opacity: 1; }
  }

  &:hover { transform: translateY(-2px); background: #19904a; }

  ${mq.reduce} {
    &::before { animation: none; opacity: 0; }
  }
`;

const Call = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${colors.forest};
  color: ${colors.porcelain};
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 28px rgba(4, 23, 19, 0.22);
  transition: background 240ms ease, transform 240ms ease;

  &:hover { background: ${colors.emerald}; transform: translateY(-2px); }

  ${mq.md} { display: none; }
`;

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 380);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <Wrap>
      {telLink && (
        <Call href={telLink} aria-label={`Call ${site.phoneDisplay}`}>
          <Phone size={18} strokeWidth={1.6} />
        </Call>
      )}
      <Chat
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${site.name} on WhatsApp`}
      >
        <MessageCircle size={22} strokeWidth={1.7} aria-hidden="true" />
        <span>WhatsApp us</span>
      </Chat>
    </Wrap>
  );
}
