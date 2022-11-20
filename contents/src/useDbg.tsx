import React, { useState } from "react"

export const useDbg = () => {
  const [isDbg, setIsDbg] = useState(false)
  const onClick = () => {
    if (!isDbg) {
      const styele = document.createElement("style")
      styele.setAttribute("id", "plasmo-dbg-style")
      document.body.appendChild(styele)
      styele.sheet.insertRule(
        "body * { outline: 1px solid red !important; }",
        styele.sheet.cssRules.length
      )
      setIsDbg(true)
    } else {
      const styele = document.querySelector("#plasmo-dbg-style")
      styele?.remove()
      setIsDbg(false)
    }
  }
  return onClick
}
