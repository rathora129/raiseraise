'use client';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/lib/content';
import { colors, mq } from '@/lib/theme';

const Section = styled.section`
  background: ${colors.porcelainDeep};
  color: ${colors.ink};
  padding: clamp(72px, 9vw, 128px) 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 14px;
  margin-top: clamp(32px, 5vw, 54px);

  ${mq.md} { grid-template-columns: 1fr 1fr; }
  ${mq.xl} { grid-template-columns: repeat(4, 1fr); }
`;

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  padding: 0 0 22px;
  background: ${colors.porcelain};
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;

  ${mq.hover} {
    &:hover { transform: translateY(-5px); box-shadow: 0 24px 50px -30px rgba(6, 32, 27, 0.4); }
    &:hover img { transform: scale(1.05); }
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${colors.stone};

  img {
    object-fit: cover;
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 23, 19, 0.05), rgba(4, 23, 19, 0.45));
  }
`;

const Index = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(244, 246, 242, 0.8);
  border: 1px solid rgba(244, 246, 242, 0.24);
  padding: 5px 8px;
  background: rgba(4, 23, 19, 0.4);
  backdrop-filter: blur(6px);
`;

const Body = styled.div`
  padding: 0 20px;
  display: grid;
  gap: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h3`
  font-size: 1.17rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
`;

const Text = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.muted};
`;

const Arrow = styled.span`
  color: ${colors.emerald};
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;

  ${Card}:hover & { transform: translate(2px, -2px); }
`;

export default function ServicesGrid({ tone = 'light' }) {
  return (
    <Section $tone={tone}>
      <div className="container">
        <SectionHeader
          eyebrow="After the doors open"
          title={'A lift is a service,\nnot a one-time sale.'}
          lead="Supply is only the beginning. Planning, installation, maintenance, repair and modernization stay with the same team."
        />
        <Grid>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} y={26}>
              <Card href={service.href}>
                <Media>
                  <Index>{service.index}</Index>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    quality={80}
                  />
                </Media>
                <Body>
                  <TitleRow>
                    <Title>{service.name}</Title>
                    <Arrow aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </Arrow>
                  </TitleRow>
                  <Text>{service.summary}</Text>
                </Body>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
