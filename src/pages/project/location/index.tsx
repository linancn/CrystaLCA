import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import { Button, Space, Tooltip } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import type { Location } from '@/services/location/data';
import { getLocationGrid } from '@/services/location/api';
import LocationCreate from './components/create';
import LocationView from './components/view';
import LocationEdit from './components/edit';
import LocationDelete from './components/delete';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const LocationIndex: FC<ListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
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
        <Space size={'small'}>
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

  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);

  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.locations" defaultMessage="Locations" />
          </>
        ),
      }}
    >
      <ProTable<Location, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <LocationCreate projectId={projectid} actionRef={actionRef} />,
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
          return getLocationGrid(params, sort, projectid);
        }}
        columns={locationColumns}
      />
    </PageContainer>
  );
};

export default LocationIndex;
