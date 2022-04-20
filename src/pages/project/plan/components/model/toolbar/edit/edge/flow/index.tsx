import { Divider, Space } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPlanModelFlowGrid } from '@/services/plan/api';
import type { PlanModelFlow } from '@/services/plan/data';
import CreateEdgeFlow from './create';

type Props = {
  projectId: number;
  modelId: string;
  edgeSourceId: string;
  edgeTargetId: string;
  planSourceId: string;
  planTargetId: string;
  processSourceId: string | undefined;
  processTargetId: string | undefined;
};

const EditEdgeFlow: FC<Props> = ({
  projectId,
  modelId,
  edgeSourceId,
  edgeTargetId,
  planSourceId,
  planTargetId,
  processSourceId,
  processTargetId,
}) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<PlanModelFlow>[] = [
    {
      title: '',
      // render: (_, row) => [
      // <EdgeProcessDelete pkid={row.pkid} actionRef={actionRef} />
      // ],
    },
    {
      title: 'Source Name',
      dataIndex: 'flowSourceName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowSourceName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          {/* <EdgeProcessView projectId={projectId} id={row.flowSourceId} /> */}
          {/* <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={sourceId}
            st={'source'}
            actionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
    {
      title: '',
    },
    {
      title: 'Target Name',
      dataIndex: 'flowTargetName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowTargetName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          {/* <EdgeProcessView projectId={projectId} id={row.flowTargetId} /> */}
          {/* <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={targetId}
            st={'target'}
            actionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
  ];

  useEffect(() => {
    if (processSourceId && processTargetId) actionRef.current?.reload();
  }, [processSourceId, processTargetId]);

  if (processSourceId && processTargetId)
    return (
      <>
        <Divider />
        <ProTable
          headerTitle="Flows"
          actionRef={actionRef}
          search={false}
          pagination={false}
          columns={columns}
          toolBarRender={() => [
            <CreateEdgeFlow
              projectId={projectId}
              planId={modelId}
              edgeSourceId={edgeSourceId}
              edgeTargetId={edgeTargetId}
              planSourceId={planSourceId}
              planTargetId={planTargetId}
              processSourceId={processSourceId}
              processTargetId={processTargetId}
              actionRef={actionRef}
            />,
          ]}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getPlanModelFlowGrid(
              params,
              sort,
              projectId,
              modelId,
              edgeSourceId,
              edgeTargetId,
              planSourceId,
              planTargetId,
              processSourceId,
              processTargetId,
            );
          }}
        />
      </>
    );
  else return <></>;
};
export default EditEdgeFlow;
