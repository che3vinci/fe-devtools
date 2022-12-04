import React, { useState } from "react";

export const toggleDbg = (enable:boolean) => {
    if (enable) {
      const style = document.createElement("style")!;
      style.setAttribute("id", "plasmo-dbg-style");
      document.body.appendChild(style);
      style.sheet.insertRule(
        ":where(body :not(#rooty *)){ outline: 1px solid red !important; }",
        style.sheet.cssRules.length
      );
    } else {
      const styele = document.querySelector("#plasmo-dbg-style");
      styele?.remove();
    }
};
