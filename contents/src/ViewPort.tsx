import { useEventListener } from "@c3/hooks"
import { Box } from "@unstyled-ui/layout"
import React, { useState } from "react"
import type { Item } from "~contents"

export type Info = {
  innerWidth: number | string
  innerHeight: number | string
}
const defaultInfo: Info = {
  innerWidth: 0,
  innerHeight: 0
}

const ViewPort: React.FC<Item> = (props) => {
  const { active, ...restProps } = props
  const [info, setInfo] = useState<Info>(defaultInfo)
  useEventListener(window, "resize", () => {
    setInfo({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    })
  })

  return (
    <Box
      style={{
        position: "fixed",
        top: 100,
        left: 0,
        background: "black",
        color: "white"
      }}
      {...restProps}>
      innerWidth:{info.innerWidth}
      <br />
      innerHeight:{info.innerHeight}
    </Box>
  )
}

export default ViewPort
