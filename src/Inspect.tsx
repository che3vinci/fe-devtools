import { useMouseMove } from '@c3/react';
import { Col, Grid, List, Row } from '@unstyled-ui/layout';
import React, { useRef, useState } from 'react';
import {fixed} from '@unstyled-ui/css';
import { colorscheme } from './common/css';

const Inspect: React.FC = (props) => {
  const { ...restProps } = props;
  const slowRef = useRef<HTMLElement | null>(null);
  const [computedStyle, setComputedStyle] = useState({} as CSSStyleDeclaration);
  const [mousePos, setMousePos] = useState({} as { x: number; y: number });

  useMouseMove((e: MouseEvent) => {
    const element = document.elementFromPoint(
      e.clientX,
      e.clientY
    )! as HTMLElement;
    element.style.outline = '1px solid red ';
    const computedStyle = window.getComputedStyle(element!);
    setComputedStyle(computedStyle);
    setMousePos({ x: e.clientX, y: e.clientY });
    if (slowRef.current && slowRef.current !== element) {
      slowRef.current.style.outline = 'none';
    }
    slowRef.current = element as HTMLElement;
  });

  return (
    <Col
      {...restProps}
      css={{
        ...fixed({
          top: mousePos.y,
          left: mousePos.x + 20
        }),
        ...colorscheme,
        fontSize: 14,
        w:'auto',
      }}>
      <Row>
        <span>width:</span>    <span>{computedStyle.width}</span>
      </Row>
      <Row>
        <span>height:</span>
        <span>{computedStyle.height}</span>
      </Row>
      <Row>
        <span>color:</span><span>{computedStyle.color}</span>
      </Row>
    </Col>
  );
};

export default Inspect;
