import React, { useState } from "react";

export const useDbg = () => {
  const [isDbg, setIsDbg] = useState(false);
  const onClick = () => {
    if (!isDbg) {
      const style = document.createElement("style");
      style.setAttribute("id", "plasmo-dbg-style");
      document.body.appendChild(style);
      style.sheet.insertRule(
        "body * { outline: 1px solid red !important; }",
        style.sheet.cssRules.length
      );
      setIsDbg(true);
    } else {
      const styele = document.querySelector("#plasmo-dbg-style");
      styele?.remove();
      setIsDbg(false);
    }
  };
  return onClick;
};
