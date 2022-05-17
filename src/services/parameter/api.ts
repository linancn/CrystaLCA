import { request } from 'umi';
import type { Parameter } from './data';
import type { SortOrder } from 'antd/lib/table/interface';
import { getServiceHostName } from '../setting';

export async function getParameterGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  processId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: Parameter[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/parameter/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      processId,
    },
  });
}

export async function getParameterById(projectId: number, processId: string, id: string) {
  return request<Parameter>(
    `${getServiceHostName()}/api/parameter/get/${projectId}/${processId}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function getParameterByPkid(pkid: number) {
  return request<Parameter>(`${getServiceHostName()}/api/parameter/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateParameter(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/parameter/update`, {
    method: 'PUT',
    data,
  });
}

export async function createParameter(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/parameter/create`, {
    method: 'POST',
    data,
  });
}

export async function deleteParameter(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/parameter/delete/${pkid}`, {
    method: 'DELETE',
  });
}
