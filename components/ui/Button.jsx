'use client';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { colors, mq } from '@/lib/theme';

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 15px 16px 15px 26px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1;
  cursor: pointer;
  transition: background 320ms ease, color 320ms ease, border-color 320ms ease, transform 320ms ease;
  white-space: nowrap;
  min-height: 52px;

  & > span { display: inline-block; }

  ${mq.hover} {
    &:hover .btn-icon {
      background: currentColor;
      color: ${(p) => (p.$variant === 'primary' ? colors.emerald : colors.forest)};
      transform: rotate(45deg);
    }
    &:hover .btn-icon svg { transform: scale(0.92); }
  }
  ${mq.reduce} { transition: none; }
`;

const iconStyle = css`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  flex-shrink: 0;
  transition: background 320ms ease, color 320ms ease, transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  svg { transition: transform 320ms ease; }
`;

const variants = {
  primary: css`
    background: ${colors.emerald};
    border-color: ${colors.emerald};
    color: ${colors.white};
    .btn-icon { background: rgba(255, 255, 255, 0.14); border-color: rgba(255, 255, 255, 0.3); }
    ${mq.hover} { &:hover { background: ${colors.emeraldDeep}; border-color: ${colors.emeraldDeep}; } }
  `,
  ink: css`
    background: ${colors.forest};
    border-color: ${colors.forest};
    color: ${colors.porcelain};
    .btn-icon { border-color: rgba(255,255,255,0.3); }
    ${mq.hover} { &:hover { background: ${colors.emeraldDeep}; border-color: ${colors.emeraldDeep}; } }
  `,
  outlineDark: css`
    background: transparent;
    border-color: rgba(255, 255, 255, 0.3);
    color: ${colors.white};
    ${mq.hover} {
      &:hover {
        background: ${colors.white};
        color: ${colors.forest};
        border-color: ${colors.white};
      }
      &:hover .btn-icon { color: ${colors.white}; }
    }
  `,
  outlineLight: css`
    background: transparent;
    border-color: rgba(14, 28, 24, 0.22);
    color: ${colors.ink};
    ${mq.hover} {
      &:hover {
        background: ${colors.ink};
        color: ${colors.porcelain};
        border-color: ${colors.ink};
      }
      &:hover .btn-icon { color: ${colors.ink}; }
    }
  `,
  ghost: css`
    padding: 0;
    min-height: 0;
    background: transparent;
    border: 0;
    color: inherit;
    text-transform: none;
    letter-spacing: 0.02em;
    font-size: 14px;
    border-radius: 0;
    .btn-icon { border: 0; width: auto; height: auto; }
    ${mq.hover} { &:hover { color: ${colors.emerald}; } }
  `,
  link: css`
    padding: 0;
    min-height: 0;
    gap: 10px;
    background: transparent;
    border: 0;
    color: inherit;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-transform: none;
    border-radius: 0;
    .btn-icon { width: 22px; height: 22px; }
  `,
};

const StyledLink = styled(Link)`${base} ${(p) => variants[p.$variant] || variants.primary}`;
const StyledA = styled.a`${base} ${(p) => variants[p.$variant] || variants.primary}`;
const StyledButton = styled.button`${base} ${(p) => variants[p.$variant] || variants.primary}`;

export default function Button({
  href,
  children,
  variant = 'primary',
  icon = true,
  className,
  external,
  onClick,
  type,
  ariaLabel,
}) {
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          <ArrowUpRight size={13} strokeWidth={1.8} />
        </span>
      )}
    </>
  );

  if (href) {
    const isInternal = href.startsWith('/') && !external;
    const Tag = isInternal ? StyledLink : StyledA;
    return (
      <Tag
        href={href}
        $variant={variant}
        className={className}
        aria-label={ariaLabel}
        {...(!isInternal ? { target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
      >
        {content}
      </Tag>
    );
  }

  return (
    <StyledButton
      $variant={variant}
      className={className}
      onClick={onClick}
      type={type || 'button'}
      aria-label={ariaLabel}
    >
      {content}
    </StyledButton>
  );
}
