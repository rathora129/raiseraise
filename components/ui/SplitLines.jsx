'use client';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

const Wrap = styled.span`
  display: block;
`;

const LineMask = styled(motion.span)`
  display: block;
  overflow: hidden;
  padding-bottom: 0.22em;
  margin-bottom: -0.22em;
`;

const Line = styled(motion.span)`
  display: block;
  will-change: transform;
`;

const lineVariants = {
  hidden: { y: '110%' },
  show: { y: '0%' },
};

export default function SplitLines({
  text,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.09,
  className,
  style,
}) {
  const reduce = useReducedMotion();
  const lines = Array.isArray(text) ? text : String(text).split('\n');

  return (
    <Wrap as={Tag} className={className} style={style}>
      {lines.map((line, i) => (
        <LineMask
          key={`${line}-${i}`}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Line
            variants={lineVariants}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </LineMask>
      ))}
    </Wrap>
  );
}
