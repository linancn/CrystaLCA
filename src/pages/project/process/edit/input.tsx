import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { message } from 'antd';
import type { FlowProcess, FlowProcessListPagination } from '@/services/flowprocess/data';
import {
  createFlowProcess,
  deleteFlowProcess,
  getFlowProcessGrid,
  updateFlowProcess,
} from '@/services/flowprocess/api';

type InputProps = {
  project: number;
  process: string;
};

const InputCard: FC<InputProps> = ({ project, process }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<FlowProcess>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
      editable: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Option',
      valueType: 'option',
      width: 200,
      render: (_, record: FlowProcess, index, action) => [
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(record.pkid);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteFlowProcess(record.pkid).then(async (result) => {
              if (result === 'ok') {
                message.success('Delete successfully!');
              } else {
                message.error(result);
              }
              actionRef.current?.reload();
            });
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <ProCard title="Inputs" bordered={false} collapsible>
      <EditableProTable<FlowProcess, FlowProcessListPagination>
        actionRef={actionRef}
        recordCreatorProps={{
          record: () => {
            return {
              pkid: -1,
              id: '',
              ioType: 'input',
              comment: '',
              projectId: project,
              processId: process,
            };
          },
        }}
        columns={columns}
        rowKey="pkid"
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowProcessGrid(params, sort, project, process);
        }}
        editable={{
          editableKeys,
          onSave: async (key, record) => {
            if (key === -1) {
              createFlowProcess(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Create successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            } else {
              updateFlowProcess(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            }
          },
          onChange: (keys) => {
            setEditableKeys(keys);
          },
        }}
      />
    </ProCard>
  );
};
export default InputCard;
