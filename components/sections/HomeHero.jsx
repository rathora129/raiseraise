'use client';
import styled from 'styled-components';
import { MessageCircle, MoveDown } from 'lucide-react';
import HeroExperience from '@/components/three/HeroExperience';
import SplitLines from '@/components/ui/SplitLines';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import { whatsappLink } from '@/lib/site';
import { colors, mq } from '@/lib/theme';

const Hero = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${colors.forestDeep};
  color: ${colors.porcelain};
  overflow: hidden;
  padding-top: calc(var(--header-h) + 40px);
  padding-bottom: clamp(34px, 6vh, 64px);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(26px, 4vh, 40px);
`;

const Topline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  margin-bottom: clamp(10px, 3vh, 28px);
  border-bottom: 1px solid rgba(244, 246, 242, 0.14);
`;

const Lobby = styled.span`
  display: none;
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.48);

  ${mq.md} { display: inline-flex; align-items: center; gap: 12px; }
  i {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.turquoise};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.9rem, 8.4vw, 8.2rem);
  line-height: 0.94;
  letter-spacing: -0.058em;
  font-weight: 550;
  max-width: 13ch;

  em {
    font-style: normal;
    color: ${colors.turquoiseSoft};
  }
`;

const Bottom = styled.div`
  display: grid;
  gap: 30px;
  margin-top: clamp(30px, 4.2vh, 50px);

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 64px;
  }
`;

const Lead = styled.p`
  max-width: 50ch;
  font-size: clamp(1rem, 1.35vw, 1.16rem);
  line-height: 1.68;
  color: rgba(244, 246, 242, 0.74);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;

  > a, > button { width: 100%; }
  ${mq.sm} { > a, > button { width: auto; } }
`;

const Rail = styled.div`
  display: none;
  gap: 34px;
  padding-left: 40px;
  border-left: 1px solid rgba(244, 246, 242, 0.16);

  ${mq.lg} { display: grid; }
`;

const RailItem = styled.div`
  display: grid;
  gap: 3px;

  span {
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(244, 246, 242, 0.38);
  }
  strong {
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(244, 246, 242, 0.86);
  }
`;

const Foot = styled.div`
  position: relative;
  z-index: 2;
  margin-top: clamp(32px, 6vh, 58px);
  padding-top: 20px;
  border-top: 1px solid rgba(244, 246, 242, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(244, 246, 242, 0.44);
`;

const Scroll = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  svg { color: ${colors.turquoise}; }
`;

export default function HomeHero() {
  return (
    <Hero>
      <HeroExperience />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Topline>
          <Eyebrow tone="dark">Supply · Installation · Care</Eyebrow>
          <Lobby>
            <i />
            Lobby level — arriving
          </Lobby>
        </Topline>

        <Content>
          <div>
            <Title>
              <SplitLines
                as="span"
                text={'Elevating every\njourney with <em>safety.</em>'}
                stagger={0.1}
              />
            </Title>
            <Bottom>
              <div>
                <Lead>
                  Passenger, home, hospital and goods lifts — planned around your building,
                  installed with care and supported long after handover.
                </Lead>
                <Actions>
                  <Button href={whatsappLink()} variant="primary">
                    <MessageCircle size={14} style={{ marginRight: 8, verticalAlign: -2 }} />
                    Start a conversation
                  </Button>
                  <Button href="/products" variant="outlineDark">
                    Explore elevators
                  </Button>
                </Actions>
              </div>
              <Rail>
                <RailItem>
                  <span>Sectors</span>
                  <strong>Residential · Commercial</strong>
                  <strong>Healthcare · Industrial</strong>
                </RailItem>
                <RailItem>
                  <span>Disciplines</span>
                  <strong>Installation & engineering</strong>
                  <strong>Maintenance · Repair · Modernization</strong>
                </RailItem>
              </Rail>
            </Bottom>
          </div>
        </Content>

        <Foot>
          <span>RaiseRaise Elevators — India</span>
          <Scroll>
            Scroll to enter
            <MoveDown size={13} />
          </Scroll>
        </Foot>
      </div>
    </Hero>
  );
}
