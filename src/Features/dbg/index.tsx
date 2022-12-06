import { useToggle } from '@c3/react';
import React, { useEffect } from 'react';
import { toggleDbg } from '../../hooks/useDbg';

const Dbg: React.FC<any> = e => {
  const [active, toggle] = useToggle(false);
  useEffect(() => {
    toggleDbg(active);
  }, [active]);
  return (
    <label>
      <input type="checkbox" checked={active} onChange={toggle}></input>
      {e.name}
    </label>
  );
};

export default Dbg;
