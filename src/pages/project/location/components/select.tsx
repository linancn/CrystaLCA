import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import type { Location } from '@/services/location/data';
import { getLocationGrid, updateParentLocation } from '@/services/location/api';
import LocationCreate from './create';
import LocationView from './view';
import LocationEdit from './edit';
import LocationDelete from './delete';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  parentId: string;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationSelect: FC<Props> = ({
  projectId,
  parentId,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<Location>();
  const actionRef = useRef<ActionType>();
  const locationColumns: ProColumns<Location>[] = [
    {
      title: <FormattedMessage id="location.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="location.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="location.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="location.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="location.version" defaultMessage="Version" />,
      dataIndex: 'version',
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          <LocationView pkid={row.pkid} actionRef={actionRef} />
          <LocationEdit
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
          <LocationDelete
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
        </Space>,
      ],
    },
  ];

  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const updateSelectId = () => {
    if (selectRow) {
      updateParentLocation(parentType, projectId, parentId, selectRow.id).then(async (result) => {
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
        <FormattedMessage id="options.selectnothing" defaultMessage="Nothing selected!" />,
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
        <ProTable<Location, ListPagination>
          actionRef={actionRef}
          search={{
            defaultCollapsed: false,
          }}
          toolBarRender={() => [
            <LocationCreate key={0} projectId={projectId} actionRef={actionRef} />,
            <Tooltip
              key={0}
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
            return getLocationGrid(params, sort, projectId);
          }}
          columns={locationColumns}
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

export default LocationSelect;
