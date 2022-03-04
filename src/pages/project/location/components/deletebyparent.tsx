import { Button, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import type { FC } from 'react';
import { useCallback } from 'react';
import { updateParentLocation } from '@/services/location/api';

type Props = {
  projectId: number;
  parentPkid: number;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationDeleteByParent: FC<Props> = ({
  parentPkid,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const onDelete = () => {
    updateParentLocation(parentType, parentPkid, '').then(async (result) => {
      if (result === 'ok') {
        message.success('Successfully Deleted!');
        reload();
      } else {
        message.error(result);
      }
    });
  };

  return (
    <Tooltip title="Delete">
      <Button onClick={onDelete}>Delete</Button>
    </Tooltip>
  );
};

export default LocationDeleteByParent;