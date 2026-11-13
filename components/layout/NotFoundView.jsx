'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Mark from '@/components/brand/Mark';
import Button from '@/components/ui/Button';
import { colors, mq } from '@/lib/theme';
import { whatsappLink } from '@/lib/site';

const Wrap = styled.section`
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  background: ${colors.forestDeep};
  color: ${colors.porcelain};
  overflow: hidden;
  padding-top: calc(var(--header-h) + 80px);
  padding-bottom: clamp(56px, 9vh, 110px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60% 60% at 80% 20%, rgba(39, 134, 114, 0.28), transparent 70%),
      repeating-linear-gradient(90deg, transparent 0 119px, rgba(244, 246, 242, 0.035) 119px 120px);
  }
`;

const Inner = styled.div`
  position: relative;
  display: grid;
  gap: 28px;
  max-width: 720px;
`;

const Code = styled.span`
  font-size: clamp(5rem, 18vw, 13rem);
  font-weight: 200;
  letter-spacing: -0.07em;
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1px rgba(244, 246, 242, 0.28);
`;

const Title = styled.h1`
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.06;
  max-width: 22ch;
`;

const Lead = styled.p`
  max-width: 52ch;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(244, 246, 242, 0.64);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
`;

const Top = styled.div`
  position: absolute;
  top: calc(var(--header-h) + 28px);
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.4);

  ${mq.md} { font-size: 10px; }
`;

const Grid = styled.div`
  position: absolute;
  right: clamp(20px, 6vw, 96px);
  top: 50%;
  transform: translateY(-50%);
  display: none;
  opacity: 0.9;

  ${mq.lg} { display: block; }
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.6);

  &:hover { color: ${colors.turquoise}; }
`;

export default function NotFoundView() {
  return (
    <Wrap>
      <div className="container">
        <Top>
          <span>Error 404</span>
          <Back href="/">
            <ArrowLeft size={13} />
            Back to home
          </Back>
        </Top>
        <Grid aria-hidden="true">
          <Mark size={210} style={{ opacity: 0.14 }} />
        </Grid>
        <Inner>
          <Code aria-hidden="true">404</Code>
          <Title>This floor doesn&apos;t exist.</Title>
          <Lead>
            The page you were looking for has moved or never existed. Head back to the
            lobby, or message us and we will point you to the right cabin.
          </Lead>
          <Row>
            <Button href="/" variant="primary">
              Return home
            </Button>
            <Button
              href={whatsappLink()}
              external
              variant="outlineDark"
              icon={false}
              ariaLabel="Chat with RaiseRaise Elevators on WhatsApp"
            >
              <MessageCircle size={15} style={{ marginRight: 2 }} />
              WhatsApp
            </Button>
          </Row>
        </Inner>
      </div>
    </Wrap>
  );
}
