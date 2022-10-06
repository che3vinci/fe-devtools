import React from "react"

const App: React.FC = (props) => {
  const { ...restProps } = props
  return <div {...restProps}>hello</div>
}

export default App
