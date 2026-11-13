'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useReducedMotion } from 'framer-motion';
import { Hand, Layers, Move3d, RotateCcw } from 'lucide-react';
import { cabinFinishes } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const CabinScene = dynamic(() => import('./CabinScene'), { ssr: false, loading: () => null });

const pulse = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
`;

const Wrap = styled.div`
  display: grid;
  gap: 20px;
  ${mq.lg} {
    grid-template-columns: ${(p) => (p.$studio ? 'minmax(0, 1fr) 330px' : '1fr')};
    align-items: start;
  }
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid rgba(244, 246, 242, 0.14);
  background: #07110e;
  aspect-ratio: 4 / 3.4;
  touch-action: pan-y;
  cursor: ${(p) => (p.$dragging ? 'grabbing' : 'grab')};
  outline: none;

  ${mq.sm} {
    aspect-ratio: 16 / 11;
  }

  ${mq.lg} {
    aspect-ratio: ${(p) => (p.$studio ? '16 / 11.6' : '16 / 8.4')};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${colors.turquoise}, 0 0 0 6px rgba(75, 194, 172, 0.24);
  }
`;

const Layer = styled.div`
  position: absolute;
  inset: 0;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  animation: ${pulse} 2.2s ease-in-out infinite;
  img {
    object-fit: cover;
    object-position: 50% 55%;
    opacity: 0.72;
    filter: saturate(0.85);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(70% 70% at 50% 45%, rgba(4, 19, 16, 0.1), rgba(4, 19, 16, 0.8));
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(4, 19, 16, 0.62);
  border: 1px solid rgba(244, 246, 242, 0.16);
  backdrop-filter: blur(10px);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.82);
  pointer-events: none;
`;

const BadgeDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${colors.turquoise};
`;

const Hint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: rgba(4, 19, 16, 0.68);
  border: 1px solid rgba(244, 246, 242, 0.16);
  backdrop-filter: blur(10px);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.82);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.4s ease;

  svg {
    color: ${colors.turquoise};
  }

  @media (max-width: 639px) {
    left: 12px;
    transform: none;
  }

  ${(p) =>
    p.$hide &&
    css`
      opacity: 0;
    `}
`;

const Current = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  max-width: 52%;
  text-align: right;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  line-height: 1.7;
  color: rgba(244, 246, 242, 0.6);
  pointer-events: none;

  @media (max-width: 639px) {
    display: none;
  }
`;

const Reset = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  border: 1px solid rgba(244, 246, 242, 0.18);
  background: rgba(4, 19, 16, 0.6);
  backdrop-filter: blur(10px);
  color: rgba(244, 246, 242, 0.75);
  font: inherit;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;

  &:hover {
    color: ${colors.white};
    border-color: rgba(75, 194, 172, 0.6);
  }
`;

const Panel = styled.div`
  border: 1px solid rgba(244, 246, 242, 0.14);
  background: rgba(244, 246, 242, 0.02);
  padding: 22px;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(244, 246, 242, 0.12);
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${colors.white};
`;

const PanelMeta = styled.span`
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.42);
`;

const Group = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid rgba(244, 246, 242, 0.08);

  &:last-of-type {
    border-bottom: 0;
  }
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 11px;
`;

const GroupLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.62);
`;

const GroupValue = styled.span`
  font-size: 11.5px;
  color: rgba(244, 246, 242, 0.88);
  text-align: right;
`;

const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

const Swatch = styled.button`
  position: relative;
  width: 34px;
  height: 34px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(244, 246, 242, 0.24);
  background: ${(p) => p.$color};
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid transparent;
    transition: border-color 0.25s ease;
  }

  &[aria-pressed='true']::after {
    border-color: ${colors.turquoise};
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.turquoise};
    outline-offset: 5px;
  }
`;

const PanelNote = styled.p`
  margin: 16px 0 0;
  font-size: 11.5px;
  line-height: 1.65;
  color: rgba(244, 246, 242, 0.5);
`;

const ResetRow = styled.button`
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  background: none;
  border: 0;
  color: ${colors.turquoiseSoft};
  font: inherit;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
  }
`;

const GROUPS = [
  { key: 'wall', label: 'Wall panels' },
  { key: 'floor', label: 'Floor' },
  { key: 'ceiling', label: 'Ceiling' },
  { key: 'light', label: 'Lighting' },
  { key: 'rail', label: 'Handrail' },
  { key: 'door', label: 'Doors' },
];

const DEFAULTS = {
  wall: 'walnut',
  floor: 'graphite',
  ceiling: 'backlit',
  light: 'warm',
  rail: 'brass',
  door: 'steel',
};

const isWebGLCapable = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
};

export default function CabinExperience({ mode = 'explore' }) {
  const studio = mode === 'studio';
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const controls = useRef({ yaw: 0, targetYaw: 0, pitch: 0, targetPitch: 0, dragging: false });
  const move = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [lowPower, setLowPower] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [finish, setFinish] = useState(DEFAULTS);

  useEffect(() => {
    setEnabled(isWebGLCapable());
    setLowPower(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    controls.current.dragging = true;
    move.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    setInteracted(true);
  };

  const onPointerMove = (event) => {
    if (!controls.current.dragging) return;
    const dx = event.clientX - move.current.x;
    const dy = event.clientY - move.current.y;
    move.current = { x: event.clientX, y: event.clientY };
    const c = controls.current;
    c.targetYaw -= dx * 0.0055;
    c.targetPitch = Math.max(-0.5, Math.min(0.5, c.targetPitch - dy * 0.0035));
  };

  const endDrag = (event) => {
    if (!controls.current.dragging) return;
    controls.current.dragging = false;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const onKeyDown = (event) => {
    const c = controls.current;
    const step = 0.22;
    if (event.key === 'ArrowLeft') c.targetYaw += step;
    else if (event.key === 'ArrowRight') c.targetYaw -= step;
    else if (event.key === 'ArrowUp') c.targetPitch = Math.min(0.5, c.targetPitch + 0.1);
    else if (event.key === 'ArrowDown') c.targetPitch = Math.max(-0.5, c.targetPitch - 0.1);
    else return;
    event.preventDefault();
    setInteracted(true);
  };

  const resetView = () => {
    controls.current.targetYaw = Math.round(controls.current.targetYaw / (Math.PI * 2)) * Math.PI * 2;
    controls.current.targetPitch = 0;
  };

  const summary = useMemo(() => {
    const names = Object.entries(finish)
      .map(([key, value]) => cabinFinishes[key]?.find((item) => item.id === value)?.name)
      .filter(Boolean);
    return names.slice(0, 3).join(' · ');
  }, [finish]);

  const activeName = (key) => cabinFinishes[key]?.find((item) => item.id === finish[key])?.name;
  const live3d = enabled && visible;

  return (
    <Wrap $studio={studio} ref={wrapRef}>
      <Viewport
        $dragging={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => {
          if (controls.current.dragging) endDrag(event);
        }}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="application"
        aria-label="360 degree interactive cabin. Drag or use arrow keys to look around."
      >
        <Layer>
          {enabled && visible ? (
            <CabinScene
              finish={finish}
              controls={controls}
              autoRotate={!studio && !reduceMotion}
              lowPower={lowPower}
            />
          ) : (
            <Placeholder>
              <Image src="/images/cabins/passenger-cabin.jpg" alt="" fill sizes="(max-width: 1020px) 100vw, 900px" />
            </Placeholder>
          )}
        </Layer>

        <Badge>
          <BadgeDot />
          {studio ? 'Studio — concept' : '360° cabin — concept'}
        </Badge>

        <Current>{summary}</Current>

        <Hint $hide={interacted && live3d}>
          {!live3d ? (
            <Layers size={14} />
          ) : dragging ? (
            <Hand size={14} />
          ) : (
            <Move3d size={14} />
          )}
          {!live3d ? 'Concept visualisation' : dragging ? 'Release to settle' : 'Drag to look around'}
        </Hint>

        {live3d && (
          <Reset type="button" onClick={resetView}>
            <RotateCcw size={12} />
            Recentre
          </Reset>
        )}
      </Viewport>

      {studio && (
        <Panel aria-label="Cabin finish selector">
          <PanelHead>
            <PanelTitle>Decoration studio</PanelTitle>
            <PanelMeta>06 layers</PanelMeta>
          </PanelHead>

          {GROUPS.map((group) => (
            <Group key={group.key}>
              <GroupHead>
                <GroupLabel>{group.label}</GroupLabel>
                <GroupValue>{activeName(group.key)}</GroupValue>
              </GroupHead>
              <Swatches role="group" aria-label={group.label}>
                {cabinFinishes[group.key].map((option) => (
                  <Swatch
                    key={option.id}
                    type="button"
                    $color={option.swatch}
                    title={option.name}
                    aria-label={option.name}
                    aria-pressed={finish[group.key] === option.id}
                    onClick={() => setFinish((prev) => ({ ...prev, [group.key]: option.id }))}
                  />
                ))}
              </Swatches>
            </Group>
          ))}

          <PanelNote>
            Conceptual visualisation for design discussion. Materials, profiles and lighting
            are confirmed after site measurement and physical sample approval.
          </PanelNote>
          <ResetRow type="button" onClick={() => setFinish(DEFAULTS)}>
            <RotateCcw size={12} />
            Reset finishes
          </ResetRow>
        </Panel>
      )}
    </Wrap>
  );
}
