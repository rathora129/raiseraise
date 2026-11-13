'use client';
import styled, { css } from 'styled-components';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { colors, mq } from '@/lib/theme';

const List = styled.div`
  border-top: 1px solid ${(p) => (p.$tone === 'dark' ? colors.lineLight : colors.line)};
`;

const Item = styled.div`
  border-bottom: 1px solid ${(p) => (p.$tone === 'dark' ? colors.lineLight : colors.line)};
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 26px 0;
  text-align: left;
  color: ${(p) => (p.$tone === 'dark' ? colors.porcelain : colors.ink)};
  transition: color 220ms ease;

  &:hover { color: ${colors.emerald}; }
  ${(p) =>
    p.$tone === 'dark' &&
    css`
      &:hover { color: ${colors.turquoise}; }
    `}

  ${mq.md} {
    padding: 30px 0;
  }
`;

const QText = styled.span`
  font-size: clamp(1rem, 1.55vw, 1.22rem);
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.4;
  max-width: 46ch;
`;

const IconWrap = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${(p) => (p.$tone === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(14,28,24,0.18)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 260ms ease, color 260ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1);
  background: ${(p) => (p.$open ? (p.$tone === 'dark' ? colors.turquoise : colors.emerald) : 'transparent')};
  color: ${(p) => (p.$open ? (p.$tone === 'dark' ? colors.forest : colors.white) : 'currentColor')};
  transform: ${(p) => (p.$open ? 'rotate(45deg)' : 'rotate(0deg)')};
  svg { width: 14px; height: 14px; }
`;

const Answer = styled(motion.div)`
  overflow: hidden;
`;

const AnswerInner = styled.div`
  padding: 0 0 28px;
  max-width: 68ch;
  font-size: 0.95rem;
  line-height: 1.72;
  color: ${(p) => (p.$tone === 'dark' ? 'rgba(244,246,242,0.66)' : colors.muted)};

  ${mq.md} { padding-left: 0; padding-right: 60px; }
`;

export default function Accordion({ items, tone = 'light', defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <List $tone={tone}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-button-${i}`;
        return (
          <Item key={item.q} $tone={tone}>
            <Question
              id={btnId}
              $tone={tone}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <QText>{item.q}</QText>
              <IconWrap $open={isOpen} $tone={tone} aria-hidden="true">
                <Plus strokeWidth={1.5} />
              </IconWrap>
            </Question>
            <AnimatePresence initial={false}>
              {isOpen && (
                <Answer
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnswerInner $tone={tone}>{item.a}</AnswerInner>
                </Answer>
              )}
            </AnimatePresence>
          </Item>
        );
      })}
    </List>
  );
}
