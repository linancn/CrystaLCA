import type { FC } from 'react';
import { useState } from 'react';
import type { Elements, Connection, Edge, OnLoadParams } from 'react-flow-renderer';
import { ArrowHeadType } from 'react-flow-renderer';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  // MiniMap,
  Controls,
  Background,
  updateEdge,
} from 'react-flow-renderer';

import Toolbox from './toolbox';
import { getPlanModel } from '@/services/plan/api';
import ProLayout from '@ant-design/pro-layout';
import HeaderContent from '@/components/HeaderContent';
import ElectronButton from '@/components/ElectronButton';

type modelProps = {
  location: {
    query: {
      projectid: number;
      id: string;
    };
  };
};

let isSetData = false;

const SaveRestore: FC<modelProps> = (props) => {
  const { projectid, id } = props.location.query;
  // const [plan, setPlan] = useState<PlanItem>();
  const [rfInstance, setRfInstance] = useState<OnLoadParams>();
  const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  const [elements, setElements] = useState<Elements>([]);
  const [parentCount, setParentCount] = useState<number>(-1);
  const [planName, setPlanName] = useState('');
  // let reatedat = false;
  if (!isSetData) {
    getPlanModel(projectid, id).then((result) => {
      isSetData = true;
      // setPlan(result);
      setParentCount(result.parentCount);
      setPlanName(result.name);
      const childrenJson = JSON.parse(result.childrenJson);
      if (childrenJson !== null) {
        setElements(childrenJson.data);
      }
    });
  }

  const onConnect = (params: Connection | Edge) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          animated: false,
          arrowHeadType: ArrowHeadType.ArrowClosed,
          label: '',
          style: { strokeWidth: '2px' },
        },
        els,
      ),
    );
  // eslint-disable-next-line no-console
  // const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  return (
    <ProLayout
      layout="mix"
      title="CrystaLCA"
      logo="/logo.svg"
      contentStyle={{ margin: 0 }}
      menuRender={false}
      headerContentRender={() => <HeaderContent title={planName} />}
      rightContentRender={() => <ElectronButton />}
    >
      <ReactFlowProvider>
        <ReactFlow
          onLoad={onLoad}
          elements={elements}
          onConnect={onConnect}
          // onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onEdgeUpdate={onEdgeUpdate}
          style={{
            position: 'static',
          }}
        >
          {/* <MiniMap /> */}
          <Controls />
          <Background />
        </ReactFlow>
        <Toolbox
          rfInstance={rfInstance}
          setElements={setElements}
          elements={elements}
          projectId={projectid}
          id={id}
          parentCount={parentCount}
        />
      </ReactFlowProvider>
    </ProLayout>
  );
};

export default SaveRestore;
