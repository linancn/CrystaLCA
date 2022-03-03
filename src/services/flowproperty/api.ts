import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { FlowProperty } from './data';

export async function getFlowPropertyGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowProperty[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowproperty/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function createFlowProperty(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowproperty/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlowProperty(pkid: number) {
  return request<string>(`http://localhost:8081/api/flowproperty/delete/${pkid}`, {
    method: 'DELETE',
  });
}
