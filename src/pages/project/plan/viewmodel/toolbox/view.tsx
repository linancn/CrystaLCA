import { getPlanInfo } from '@/services/plan/api';
import { Button, Descriptions, Drawer } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode } from 'react-flow-renderer';
import moment from 'moment';
import { getProcess } from '@/services/process/api';

type viewProps = {
  project: number;
  selectedElements: Elements<any> | null;
};

let preid = '';

const View: FC<viewProps> = ({ project, selectedElements }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const onView = () => {
    setIsDrawerVisible(true);
  };
  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  if (!selectedElements) {
    return (
      <Button key="View" block disabled={true}>
        View
      </Button>
    );
  }
  if (isDrawerVisible) {
    if (preid !== selectedElements[0].id) {
      preid = selectedElements[0].id;
      if (isNode(selectedElements[0])) {
        if (selectedElements[0].data.type === 'plan') {
          getPlanInfo(project, preid).then(async (result) => {
            setViewDescriptions(
              <Descriptions column={1}>
                <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
                <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
                <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
                <Descriptions.Item label="Last Update">
                  {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
              </Descriptions>,
            );
          });
        } else if (selectedElements[0].data.type === 'process') {
          getProcess(project, preid).then(async (result) => {
            setViewDescriptions(
              <Descriptions column={1}>
                <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
                <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
                <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
                <Descriptions.Item label="Last Update">
                  {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
              </Descriptions>,
            );
          });
        }
      }
    }
  } else {
    preid = '';
  }

  return (
    <>
      <Button key="View" onClick={onView} block>
        View
      </Button>
      <Drawer
        visible={isDrawerVisible}
        mask={false}
        title="View"
        width="400px"
        onClose={handleDrawerAddCancel}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};
export default View;
