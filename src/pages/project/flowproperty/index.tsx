import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import type { FlowProperty } from '@/services/flowproperty/data';
import FlowPropertyCreate from './components/create';
import { getFlowPropertyGrid } from '@/services/flowproperty/api';
import FlowPropertySelect from './components/select';
import { Space } from 'antd';
import FlowPropertyView from './components/view';
import FlowPropertyEdit from './components/edit';
import FlowPropertyDelete from './components/delete';
import CategoryViewByParent from '../category/components/viewbyparent';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const FlowPropertyIndex: FC<ListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const flowPropertyColumns: ProColumns<FlowProperty>[] = [
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
      title: 'Flow Property Type',
      dataIndex: 'flowPropertyType',
      sorter: true,
      search: false,
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
            parentType={'flowproperty'}
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
      title: 'Database',
      dataIndex: 'database',
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
      render: (_, row) => [
        <Space size={'small'}>
          <FlowPropertyView pkid={row.pkid} />
          <FlowPropertyEdit pkid={row.pkid} actionRef={actionRef} />
          <FlowPropertyDelete pkid={row.pkid} actionRef={actionRef} />
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
            <FormattedMessage id="menu.measurements" defaultMessage="Measurements" />
          </>
        ),
      }}
    >
      <ProTable<FlowProperty, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <FlowPropertyCreate projectId={projectid} actionRef={actionRef} />,
          <FlowPropertySelect />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowPropertyGrid(params, sort, projectid);
        }}
        columns={flowPropertyColumns}
      />
    </PageContainer>
  );
};

export default FlowPropertyIndex;
