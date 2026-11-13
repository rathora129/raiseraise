'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { mq } from '@/lib/theme';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });

const drift = keyframes`
  from { transform: scale(1.04) translate3d(0, 0, 0); }
  to { transform: scale(1.11) translate3d(-1.2%, -1.4%, 0); }
`;

const Stage = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #041310;
`;

const Fallback = styled.div`
  position: absolute;
  inset: -2%;
  animation: ${drift} 26s ease-in-out infinite alternate;
  ${mq.reduce} {
    animation: none;
  }
  img {
    object-fit: cover;
    object-position: 50% 58%;
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 18% 20%, rgba(4, 19, 16, 0.86) 0%, rgba(4, 19, 16, 0.42) 42%, rgba(4, 19, 16, 0) 70%),
    linear-gradient(180deg, rgba(4, 19, 16, 0.66) 0%, rgba(4, 19, 16, 0.08) 38%, rgba(4, 19, 16, 0.2) 68%, rgba(4, 19, 16, 0.94) 100%);
`;

const Note = styled.div`
  position: absolute;
  right: clamp(20px, 4vw, 64px);
  bottom: 132px;
  display: none;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.52);

  span {
    width: 26px;
    height: 1px;
    background: rgba(75, 194, 172, 0.5);
  }

  ${mq.md} {
    display: flex;
  }
`;

const isWebGLCapable = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
};

export default function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia('(min-width: 820px)');
    setWide(query.matches);
    const onChange = (event) => setWide(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const allowScene = mounted && wide && !reduceMotion && isWebGLCapable();

  useEffect(() => {
    if (!allowScene) return undefined;
    let idle;
    if ('requestIdleCallback' in window) {
      idle = window.requestIdleCallback(() => setReady(true), { timeout: 2200 });
      return () => window.cancelIdleCallback(idle);
    }
    idle = window.setTimeout(() => setReady(true), 700);
    return () => window.clearTimeout(idle);
  }, [allowScene]);

  return (
    <Stage aria-hidden="true">
      {allowScene && ready ? (
        <HeroScene lowPower={false} />
      ) : (
        <Fallback>
          <Image
            src="/images/spaces/lobby-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </Fallback>
      )}
      <Scrim />
      <Note>
        <span />
        {allowScene
          ? 'Interactive 3D concept — move your cursor'
          : 'Concept visualisation'}
      </Note>
    </Stage>
  );
}
