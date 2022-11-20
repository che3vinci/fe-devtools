import { useMouse } from "@c3/react"
import { Col, Grid, List, Row } from "@unstyled-ui/layout"
import React, { useRef, useState } from "react"

const Inspect: React.FC = (props) => {
  const { active, ...restProps } = props
  const slowRef = useRef<HTMLElement | null>(null)
  const [computedStyle, setComputedStyle] = useState({} as CSSStyleDeclaration)
  const [mousePos, setMousePos] = useState({} as { x: number; y: number })

  useMouse((e: MouseEvent) => {
    const element = document.elementFromPoint(
      e.clientX,
      e.clientY
    )! as HTMLElement
    element.style.outline = "1px solid red "
    const computedStyle = window.getComputedStyle(element!)
    setComputedStyle(computedStyle)
    setMousePos({ x: e.clientX, y: e.clientY })
    if (slowRef.current && slowRef.current !== element) {
      slowRef.current.style.outline = "none"
    }
    slowRef.current = element as HTMLElement
  })
  // console.log("inspect", active, restProps)
  if (!active) {
    return null
  }
  return (
    <Col
      {...restProps}
      style={{
        fontSize: 20,
        background: "white",
        color: "black",
        position: "fixed",
        top: mousePos.y,
        left: mousePos.x + 20
      }}>
      <Row>
        <span>width:</span>
        <code>{computedStyle.width}</code>
      </Row>
      <br />
      <Row>
        <span>height:</span>
        <code>{computedStyle.height}</code>
      </Row>
    </Col>
  )
}

export default Inspect
