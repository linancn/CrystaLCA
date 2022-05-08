import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import { getUnitGroupGrid, updateParentUnitGroup } from '@/services/unitgroup/api';
import UnitJsonList from './unitjson';
import CategoryViewByParent from '../../category/components/viewbyparent';
// import UnitGroupView from './view';
// import UnitGroupEdit from './edit';
// import UnitGroupDelete from './delete';
import type { UnitGroup } from '@/services/unitgroup/data';
import UnitGroupCreate from './create';
import { FormattedMessage } from 'umi';

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
      title: <FormattedMessage id="unitgroup.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="flow.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="unitgroup.referenceUnit" defaultMessage="Reference Unit" />,
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
          <UnitJsonList projectId={projectId} unitGroupId={row.id} parentActionRef={actionRef} />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="unitgroup.categoryName" defaultMessage="Category" />,
      dataIndex: 'categoryName',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'unitgroup'}
            parentId={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="unitgroup.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="unitgroup.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
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
          message.success(
            <FormattedMessage
              id="options.selectedsuccess"
              defaultMessage="Successfully Selected!"
            />,
          );
          setDrawerVisible(false);
          reload();
        } else {
          message.error(result);
        }
      });
    } else {
      message.error(
        <FormattedMessage id="options.selectedsuccess" defaultMessage="Successfully Selected!" />,
      );
    }
  };
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.select" defaultMessage="Select" />}>
        <Button type="primary" onClick={() => setDrawerVisible(true)}>
          {<FormattedMessage id="options.select" defaultMessage="Select" />}
        </Button>
      </Tooltip>

      <Drawer
        title={<FormattedMessage id="options.select" defaultMessage="Select" />}
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
              <FormattedMessage id="options.cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={() => updateSelectId()} type="primary">
              {<FormattedMessage id="options.select" defaultMessage="Select" />}
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
            <Tooltip
              title={
                <FormattedMessage
                  id="options.selectfromdatabase"
                  defaultMessage="Select From Database"
                />
              }
            >
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
            return getUnitGroupGrid(params, sort, projectId, false);
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
