const PlasmoInline = () => {
  const onClick = () => {
    const styele = document.createElement("style")
    document.body.appendChild(styele)
    styele.sheet.insertRule(
      "body * { outline: 1px solid red; }",
      styele.sheet.cssRules.length
    )
  }

  return (
    <button style={{ position: "fixed" }} onClick={onClick}>
      dbg
    </button>
  )
}

export default PlasmoInline
