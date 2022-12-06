import { noop } from '@c3/utils';
import { fixed } from '@unstyled-ui/css';
import { BaseListItemType, List } from '@unstyled-ui/layout';
import ContainningBlock from './Features/containingblock';
import Dbg from './Features/dbg';
import Edit from './Features/edit';
import InspectView from './Features/inspect';
import StackCtx from './Features/stackCtx';
import ViewPort from './Features/viewport';

export type Item = {
  name: string;
} & BaseListItemType;

const cfg: Item[] = [
  {
    id: '1',
    name: 'dbg',
    renderItem: (e: Item) => {
      return <Dbg {...e} />;
    },
  },
  {
    id: '2',
    name: 'viewport',
    renderItem: function Comp(e) {
      return <ViewPort {...e} />;
    },
  },
  {
    id: '3',
    name: 'edit',
    renderItem: function Comp(e: Item) {
      return <Edit {...e} />;
    },
  },
  {
    id: '4',
    name: 'containing-block',
    renderItem: function Comp(e) {
      return <ContainningBlock {...e} />;
    },
  },
  {
    id: '5',
    name: 'inspect',
    renderItem: function Comp(e) {
      return <InspectView {...e} />;
    },
  },
  {
    id: '6',
    name: 'stack context',
    renderItem: function Comp(e) {
      return <StackCtx {...e} />;
    },
  },
];

const App = () => {
  return (
    <List
      css={{
        border: '1px solid gray',
        ...fixed({ left: 10, bottom: 10 }),
        zIndex: 999999,
        background: 'rgba(255, 255, 255, 0.5)',
      }}
      data={cfg}
      updateData={noop}
      direction="column"
    />
  );
};

export default App;
