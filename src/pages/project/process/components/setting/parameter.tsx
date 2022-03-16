import type { FC } from 'react';
import { useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getParameterJsonGrid } from '@/services/process/api';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import type { ParameterJson } from '@/services/process/data';
import ParameterJsonCreate from './parameter/create';
import ParameterJsonView from './parameter/view';
import ParameterJsonEdit from './parameter/edit';
import ParameterJsonDelete from './parameter/delete';

type Props = {
  processPkid: number;
};

const ParameterJsonCard: FC<Props> = ({ processPkid }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<ParameterJson>[] = [
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
      title: 'Formula',
      dataIndex: 'formula',
      search: false,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      search: false,
    },
    // {
    //   title: 'Min',
    //   dataIndex: 'min',
    //   search: false,
    // },
    // {
    //   title: 'Max',
    //   dataIndex: 'max',
    //   search: false,
    // },
    {
      title: 'SD',
      dataIndex: 'uncertaintyGeomSd',
      search: false,
    },
    {
      title: 'Mean',
      dataIndex: 'uncertaintyGeomMean',
      search: false,
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ParameterJsonView processPkid={row.processPkid} id={row.id} />
          <ParameterJsonEdit processPkid={row.processPkid} id={row.id} actionRef={actionRef} />
          <ParameterJsonDelete processPkid={row.processPkid} id={row.id} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  actionRef.current?.reload();
  return (
    <ProCard title="Parameters" bordered={false} collapsible>
      <ProTable<ParameterJson, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <ParameterJsonCreate processPkid={processPkid} actionRef={actionRef} />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getParameterJsonGrid(params, sort, processPkid);
        }}
        columns={columns}
      />
    </ProCard>
  );
};
export default ParameterJsonCard;
