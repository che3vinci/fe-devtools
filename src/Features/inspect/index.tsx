import { useToggle } from '@c3/react';
import React from 'react';
import { Item } from '../../App';
import InspectView from './View';

const Inspect: React.FC<Item> = e => {
  const [active, toggle] = useToggle(false);
  return (
    <>
      <label>
        <input type="checkbox" checked={active} onChange={toggle}></input>
        {e.name}
      </label>
      {active && <InspectView {...e} />}
    </>
  );
};

export default Inspect;
