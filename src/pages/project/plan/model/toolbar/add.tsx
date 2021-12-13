import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import styles from '@/style/custom.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanInfoGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { Process } from '@/services/process/data';
import { getProcessGrid } from '@/services/process/api';
import type { ListPagination } from '@/services/home/data';
import type { IGraphCommandService, NsNodeCmd } from '@antv/xflow';
import { XFlowNodeCommands } from '@antv/xflow';
import { DndNode } from './config/dndnode';

type addProps = {
  projectId: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  commandService: IGraphCommandService | undefined;
};

const Add: FC<addProps> = ({ projectId, drawerVisible, setDrawerVisible, commandService }) => {
  const [drawerAddPlanVisible, setDrawerAddPlanVisible] = useState(false);
  const [drawerAddProcessVisible, setDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanInfo>();
  const [addProcessToModel, setAddProcessToModel] = useState<Process>();

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

  const onAddPlanToModel = useCallback(() => {
    if (addPlanToModel) {
      const newNode = {
        id: addPlanToModel.id,
        component: DndNode,
        width: 100,
        height: 30,
        label: addPlanToModel.name,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
        },
        ports: {
          groups: {
            top: {
              attrs: {
                circle: {
                  fill: '#fff',
                  magnet: true,
                  r: 4,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
              position: {
                name: 'top',
              },
              zIndex: 10,
            },
            bottom: {
              attrs: {
                circle: {
                  fill: '#fff',
                  magnet: true,
                  r: 4,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
              position: {
                name: 'bottom',
              },
              zIndex: 10,
            },
            left: {
              attrs: {
                circle: {
                  fill: '#fff',
                  magnet: true,
                  r: 4,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
              position: {
                name: 'left',
              },
              zIndex: 10,
            },
            right: {
              attrs: {
                circle: {
                  fill: '#fff',
                  magnet: true,
                  r: 4,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
              position: {
                name: 'right',
              },
              zIndex: 10,
            },
          },
          items: [
            {
              group: 'top',
              id: addPlanToModel.id + '-t',
            },
            {
              group: 'bottom',
              id: addPlanToModel.id + '-b',
            },
            {
              group: 'left',
              id: addPlanToModel.id + '-l',
            },
            {
              group: 'right',
              id: addPlanToModel.id + '-r',
            },
          ],
        },
        info: {
          name: addPlanToModel.name,
          type: 'plan',
        },
      };
      commandService?.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
        nodeConfig: newNode,
      });
      setDrawerAddPlanVisible(false);
    }
  }, [addPlanToModel, commandService]);

  const onAddProcessToModel = useCallback(() => {
    if (addProcessToModel) {
      const newNode = {
        id: addProcessToModel.id,
        width: 100,
        height: 30,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
          label: {
            text: addProcessToModel.name,
            fill: '#333',
          },
        },
        info: {
          type: 'process',
        },
      };
      commandService?.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
        nodeConfig: newNode,
      });
      setDrawerAddProcessVisible(false);
    }
  }, [addProcessToModel, commandService]);

  return (
    <>
      <Drawer visible={drawerVisible} title="Add" onClose={callbackDrawerVisible}>
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
