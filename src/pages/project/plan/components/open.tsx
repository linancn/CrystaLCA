import type { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons';

type Props = {
  projectId: number;
  id: string;
};
const PlanOpen: FC<Props> = ({ projectId, id }) => {
  return (
    <>
      <Tooltip title="Open model">
        <Button
          href={`/project/plan/editmodel?projectid=${projectId}&id=${id}`}
          // target="_blank"
          shape="circle"
          icon={<ApartmentOutlined />}
          size="small"
        />
      </Tooltip>
    </>
  );
};

export default PlanOpen;
