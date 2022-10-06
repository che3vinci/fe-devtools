import React from "react"

const App: React.FC = (props) => {
  const { ...restProps } = props
  return <div {...restProps}>tabs</div>
}

export default App
