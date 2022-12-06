import { useToggle } from '@c3/react';
import React from 'react';
import { Item } from '../../App';
import { useClick2Edit } from '../../hooks/useEdit';

const Edit: React.FC<Item> = (e) => {
  const [active, toggle] = useToggle(false);
  useClick2Edit(active);
  return (
    <label>
      <input type="checkbox" checked={active} onChange={toggle}></input>
      {e.name}
    </label>
  );
};

export default Edit;
