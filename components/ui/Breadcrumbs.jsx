'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(p) => (p.$tone === 'dark' ? 'rgba(244,246,242,0.55)' : 'rgba(14,28,24,0.55)')};

  a {
    transition: color 200ms ease;
    &:hover { color: ${(p) => (p.$tone === 'dark' ? '#fff' : '#0E1C18')}; }
  }

  svg { opacity: 0.5; }
  [aria-current='page'] { color: ${(p) => (p.$tone === 'dark' ? 'rgba(244,246,242,0.9)' : '#0E1C18')}; }
`;

export default function Breadcrumbs({ items, tone = 'dark' }) {
  return (
    <Nav aria-label="Breadcrumb" $tone={tone}>
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ChevronRight size={10} aria-hidden="true" />
          {i === items.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link href={item.href}>{item.name}</Link>
          )}
        </span>
      ))}
    </Nav>
  );
}
