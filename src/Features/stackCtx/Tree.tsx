import React from 'react';

//TODO:打印出stack context tree
const StackContextTree: React.FC = props => {
  const { ...restProps } = props;
  return <div {...restProps}>hello</div>;
};

export default StackContextTree;
