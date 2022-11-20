import { useMouse } from "@c3/react"
import { Atomic, Button } from "@unstyled-ui/atomic"
import {
  BaseSwitchItemType,
  MenuConfig,
  SideBar
} from "@unstyled-ui/ct-switcher"
import { Box } from "@unstyled-ui/layout"
import styleText from "data-text:./style.css"
import React, { useCallback, useEffect, useRef, useState } from "react"

import Inspect from "./src/Inspect"
import ViewPort from "./src/ViewPort"
import { useDbg } from "./src/useDbg"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export type Item = {
  name: string
  renderContent?: (e: Item) => JSX.Element
} & BaseSwitchItemType

const menuConfig: MenuConfig<Item> = [
  {
    id: "1",
    name: "dbg",
    active: false,
    //@ts-ignore
    renderItem: (e: Item): JSX.Element => {
      const showDbg = useDbg()
      return <Box onClick={showDbg}>{e.name}</Box>
    }
  },
  {
    id: "2",
    name: "viewport",
    active: true,
    renderContent: (e) => <ViewPort {...e} />
  },
  {
    id: "3",
    name: "edit",
    active: false,
    renderItem: (item: Item) => {
      const eleOnMouseRef = useRef<HTMLElement>(null)
      const setEditable = useCallback(() => {
        const eleOnMouse = eleOnMouseRef.current
        if (eleOnMouse) {
          eleOnMouse.contentEditable = "true"
        }
      }, [])
      useMouse((e: MouseEvent) => {
        const element = document.elementFromPoint(
          e.clientX,
          e.clientY
        )! as HTMLElement
        if (eleOnMouseRef.current !== element) {
          // element.style.outline = "1px solid green"

          if (eleOnMouseRef.current) {
            eleOnMouseRef.current.removeEventListener("dblclick", setEditable)
            eleOnMouseRef.current.removeAttribute("contentEditable")
            // eleOnMouseRef.current.style.outline = "none"
          }
          eleOnMouseRef.current = element
          eleOnMouseRef.current?.addEventListener("dblclick", setEditable)
        }
      })

      return <Box>edit</Box>
    }
  }
  // {
  //   id: "4",
  //   name: "inspect",
  //   active: false,
  //   // renderContent: (e) => <Inspect {...e} />
  // }
]
const PlasmoInline = () => {
  const [cfg, setCfg] = useState(menuConfig)
  console.log("cfg", cfg)
  return (
    <div>
      <SideBar
        className="toolbar-container"
        menuConfig={cfg}
        updateConfig={setCfg}
        renderItem={(item) => <Box>{item.name}</Box>}
        direction="column"
      />
    </div>
  )
}

export default PlasmoInline
