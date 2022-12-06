import React from 'react';

const App: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div {...restProps}>
      <div id="a1">
        <div id="b1">
          <div id="c1"></div>
          <div id="c2"></div>
        </div>
        <div id="b2"></div>
      </div>
      <div id="a2">
        <div id="b3">
          <div id="c3"></div>
          <div id="c4"></div>
        </div>
        <div id="b4"></div>
      </div>
      <div id="a3">
        <div id="b5">
          <div id="c5"></div>
        </div>
        <div id="b6"></div>
      </div>
      <div id="a4">
        <div id="b7"></div>
        <div id="b8"></div>
      </div>
    </div>
  );
};

export default App;
