'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Mark from '@/components/brand/Mark';
import { colors } from '@/lib/theme';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: ${colors.forest};
  display: grid;
  place-items: center;
  align-content: center;
  gap: 22px;
  color: ${colors.porcelain};
`;

const Stack = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
  width: 150px;
`;

const Counter = styled.div`
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.55);
  font-variant-numeric: tabular-nums;
`;

const Bar = styled.div`
  width: 150px;
  height: 1px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
`;

const Fill = styled(motion.div)`
  height: 100%;
  background: ${colors.turquoise};
  transform-origin: left;
`;

export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const already = sessionStorage.getItem('rr-visited');
    if (reduce || already) {
      setVisible(false);
      return;
    }
    let value = 0;
    const tick = setInterval(() => {
      value = Math.min(100, value + Math.ceil((100 - value) / 8));
      setCount(value);
      if (value >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          sessionStorage.setItem('rr-visited', '1');
          setVisible(false);
        }, 260);
      }
    }, 34);
    return () => clearInterval(tick);
  }, [reduce]);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <Stack>
            <Mark size={42} />
            <Counter>
              {count} — Raising the standard
            </Counter>
            <Bar>
              <Fill
                animate={{ scaleX: count / 100 }}
                transition={{ duration: 0.3, ease: 'linear' }}
                style={{ width: '100%' }}
              />
            </Bar>
          </Stack>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
