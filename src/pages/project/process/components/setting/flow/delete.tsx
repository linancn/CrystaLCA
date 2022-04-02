import { FC, useState } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteExchangeJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';

type Props = {
  processPkid: number;
  flowId: string;
  input: boolean;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const ProcessFlowDelete: FC<Props> = ({ processPkid, flowId, input, actionRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteExchangeJson(processPkid, flowId, input).then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="flowproperty.deletesuccess"
            defaultMessage="Delete successfully!"
          />,
        );
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
  }, [actionRef, flowId, input, processPkid]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={showModal} />
        <Modal
          title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <FormattedMessage
            id="flow.delete"
            defaultMessage="Are you sure you want to delete this flow?"
          />
        </Modal>
      </Tooltip>
    </>
  );
};

export default ProcessFlowDelete;
