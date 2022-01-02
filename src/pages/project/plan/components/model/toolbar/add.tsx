import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import { Button, Drawer, Space } from 'antd';
import { getPlanInfoGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { Process } from '@/services/process/data';
import { getProcessGrid } from '@/services/process/api';
import type { ListPagination } from '@/services/home/data';
import type { IApplication, NsNodeCmd } from '@antv/xflow';
import { XFlowNodeCommands } from '@antv/xflow';
import { NodeAttrs, NodePorts } from './config/node';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  xflowApp: IApplication | undefined;
  projectId: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const Add: FC<Props> = ({ xflowApp, projectId, drawerVisible, setDrawerVisible }) => {
  const [drawerAddPlanVisible, setDrawerAddPlanVisible] = useState(false);
  const [drawerAddProcessVisible, setDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanInfo>();
  const [addProcessToModel, setAddProcessToModel] = useState<Process>();
  // const app = useXFlowApp();

  const planInfoColumns: ProColumns<PlanInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: true,
      search: false,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Last Update Time',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
  ];
  const ProcessColumns: ProColumns<Process>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: true,
      search: false,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Last Update Time',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
  ];

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const onAddPlanToModel = () => {
    if (addPlanToModel) {
      const newNode = {
        id: addPlanToModel.id,
        width: 100,
        height: 30,
        attrs: NodeAttrs(addPlanToModel.name),
        ports: NodePorts(addPlanToModel.id),
        info: {
          type: 'plan',
        },
      };
      if (xflowApp) {
        xflowApp.commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(
          XFlowNodeCommands.ADD_NODE.id,
          {
            nodeConfig: newNode,
          },
        );
      }
      setDrawerAddPlanVisible(false);
    }
  };

  const onAddProcessToModel = () => {
    if (addProcessToModel) {
      const newNode = {
        id: addProcessToModel.id,
        width: 100,
        height: 30,
        attrs: NodeAttrs(addProcessToModel.name),
        ports: NodePorts(addProcessToModel.id),
        info: {
          type: 'process',
        },
      };
      if (xflowApp) {
        xflowApp.commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(
          XFlowNodeCommands.ADD_NODE.id,
          {
            nodeConfig: newNode,
          },
        );
      }
      setDrawerAddProcessVisible(false);
    }
  };

  return (
    <>
      <Drawer
        closable={false}
        extra={
          <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
        }
        visible={drawerVisible}
        title="Add"
        onClose={callbackDrawerVisible}
      >
        <Button
          key="plan"
          onClick={() => {
            setDrawerVisible(false);
            setDrawerAddPlanVisible(true);
          }}
        >
          Plan
        </Button>{' '}
        Or{' '}
        <Button
          key="process"
          onClick={() => {
            setDrawerVisible(false);
            setDrawerAddProcessVisible(true);
          }}
        >
          Process
        </Button>
      </Drawer>
      <Drawer
        visible={drawerAddPlanVisible}
        title="Add Plan"
        width="800px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerAddPlanVisible(false)}
          />
        }
        onClose={() => setDrawerAddPlanVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerAddPlanVisible(false)}>Cancel</Button>
            <Button onClick={onAddPlanToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<PlanInfo, ListPagination>
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
            return getPlanInfoGrid(params, sort, projectId);
          }}
          columns={planInfoColumns}
          rowClassName={(record) => {
            return record.name === addPlanToModel?.name ? styles.split_row_select_active : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setAddPlanToModel(record);
                }
              },
            };
          }}
        />
      </Drawer>
      <Drawer
        visible={drawerAddProcessVisible}
        title="Add Process"
        width="800px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerAddProcessVisible(false)}
          />
        }
        onClose={() => setDrawerAddProcessVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerAddProcessVisible(false)}>Cancel</Button>
            <Button onClick={onAddProcessToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<Process, ListPagination>
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
            return getProcessGrid(params, sort, projectId);
          }}
          columns={ProcessColumns}
          rowClassName={(record) => {
            return record.name === addProcessToModel?.name ? styles.split_row_select_active : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setAddProcessToModel(record);
                }
              },
            };
          }}
        />
      </Drawer>
    </>
  );
};

export default Add;
