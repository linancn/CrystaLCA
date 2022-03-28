import type { FC } from 'react';
import { useState, useCallback } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';

import styles from '@/style/custom.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Space } from 'antd';
import type { FlowProperty } from '@/services/flowproperty/data';
import { getFlowPropertyGrid, copyFlowProperty } from '@/services/flowproperty/api';

type Props = {
  projectId: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FlowPropertyOtherProject: FC<Props> = ({ projectId, parentActionRef, setDrawerVisible }) => {
  const [selectRow, setSelectRow] = useState<FlowProperty>();
  const columns: ProColumns<FlowProperty>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      sorter: true,
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
  ];
  const reload = useCallback(() => {
    setDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setDrawerVisible]);

  const submitSelectId = () => {
    if (selectRow) {
      copyFlowProperty({ projectId, othProjectId: selectRow.projectId, othId: selectRow.id }).then(
        async (result) => {
          if (result === 'ok') {
            message.success('Successfully Selected!');
            setDrawerVisible(false);
            reload();
          } else {
            message.error(result);
          }
        },
      );
    } else {
      message.error('Select nothing');
    }
  };

  return (
    <PageContainer
      header={{ title: '', subTitle: '' }}
      footer={[
        <Space size={'middle'} className={styles.footer_right}>
          <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
          <Button onClick={() => submitSelectId()} type="primary">
            Select
          </Button>
        </Space>,
      ]}
    >
      <ProTable<FlowProperty, ListPagination>
        search={{
          defaultCollapsed: false,
        }}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowPropertyGrid(params, sort, projectId, true);
        }}
        columns={columns}
        rowClassName={(record) => {
          return record.id === selectRow?.id ? styles.split_row_select_active : '';
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record) {
                setSelectRow(record);
              }
            },
          };
        }}
      />
    </PageContainer>
  );
};

export default FlowPropertyOtherProject;
