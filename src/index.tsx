import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { devtoolId } from './common/constants';

import './index.css';

  let root = document.getElementById(devtoolId);
  if (!root) {
    const el = document.createElement('div');
    el.setAttribute('id', devtoolId);
    el.setAttribute('style', 'position:relative;z-index:100');
    document.body.append(el);
    root = el;
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
      {/* <div>hello</div> */}
    </React.StrictMode>
  );
