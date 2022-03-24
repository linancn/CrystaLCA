import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import { getUnitGroupGrid, updateParentUnitGroup } from '@/services/unitgroup/api';
import UnitJsonList from './unitjson/list';
import CategoryViewByParent from '../../category/components/viewbyparent';
// import UnitGroupView from './view';
// import UnitGroupEdit from './edit';
// import UnitGroupDelete from './delete';
import type { UnitGroup } from '@/services/unitgroup/data';
import UnitGroupCreate from './create';

type Props = {
  projectId: number;
  parentPkid: number;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnitGroupSelectByParent: FC<Props> = ({
  projectId,
  parentPkid,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<UnitGroup>();
  const actionRef = useRef<ActionType>();
  const unitGroupColumns: ProColumns<UnitGroup>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Reference Unit',
      dataIndex: 'referenceUnit',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.referenceUnit == null ? '-' : row.referenceUnit}
          {/* <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip> */}
          <UnitJsonList unitGroupPkid={row.pkid} parentActionRef={actionRef} />
        </Space>,
      ],
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'unitgroup'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Release',
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      // render: (_, row) => [
      //   <Space size={'small'}>
      //     <UnitGroupView pkid={row.pkid} />
      //     <UnitGroupEdit pkid={row.pkid} actionRef={actionRef} />
      //     <UnitGroupDelete pkid={row.pkid} actionRef={actionRef} />
      //   </Space>,
      // ],
    },
  ];

  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const updateSelectId = () => {
    if (selectRow) {
      updateParentUnitGroup(parentType, parentPkid, selectRow.id).then(async (result) => {
        if (result === 'ok') {
          message.success('Successfully Selected!');
          setDrawerVisible(false);
          reload();
        } else {
          message.error(result);
        }
      });
    } else {
      message.error('Select nothing');
    }
  };
  return (
    <>
      <Tooltip title="Select">
        <Button type="primary" onClick={() => setDrawerVisible(true)}>
          Select
        </Button>
      </Tooltip>

      <Drawer
        title="Select"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => {
              setDrawerVisible(false);
              reload();
            }}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button
              onClick={() => {
                setDrawerVisible(false);
                reload();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => updateSelectId()} type="primary">
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<UnitGroup, ListPagination>
          actionRef={actionRef}
          search={{
            defaultCollapsed: false,
          }}
          toolBarRender={() => [
            <UnitGroupCreate projectId={projectId} actionRef={actionRef} />,
            <Tooltip title="Select From Database">
              <Button
                size={'middle'}
                type="text"
                icon={<DatabaseOutlined />}
                onClick={() => {
                  // handleDrawerVisible(true);
                }}
              />
            </Tooltip>,
          ]}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getUnitGroupGrid(params, sort, projectId);
          }}
          columns={unitGroupColumns}
          rowClassName={(record) => {
            return record.pkid === selectRow?.pkid ? styles.split_row_select_active : '';
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
      </Drawer>
    </>
  );
};

export default UnitGroupSelectByParent;
