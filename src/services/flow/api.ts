import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { Flow, FlowPropertyJson } from './data';

export async function getFlowGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  otherProject: boolean,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: Flow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      otherProject,
    },
  });
}

export async function getFlowPropertyJsonViewGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  flowId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowPropertyJson[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flow/getpropertyjsonviewgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      flowId,
    },
  });
}

export async function getFlowByPkid(pkid: number) {
  return request<Flow>(`http://localhost:8081/api/flow/get/${pkid}`, {
    method: 'GET',
  });
}

export async function createFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/create', {
    method: 'POST',
    data,
  });
}

export async function updateFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/update', {
    method: 'PUT',
    data,
  });
}

export async function createFlowPropertyJson(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/createpropertyjson', {
    method: 'POST',
    data,
  });
}

export async function updateFlowPropertyJson(propertyId: string, data?: Record<string, any>) {
  return request<string>(`http://localhost:8081/api/flow/updatepropertyjson/${propertyId}`, {
    method: 'PUT',
    data,
  });
}

export async function getFlowPropertyJsonView(
  projectId: number,
  flowId: string,
  propertyId: string,
) {
  return request<FlowPropertyJson>(
    `http://localhost:8081/api/flow/getpropertyjsonview/${projectId}/${flowId}/${propertyId}`,
    {
      method: 'GET',
    },
  );
}

export async function deleteFlow(pkid: number) {
  return request<string>(`http://localhost:8081/api/flow/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function deleteFlowPropertyJson(
  projectId: number,
  flowId: string,
  propertyId: string,
) {
  return request<string>(
    `http://localhost:8081/api/flow/deletepropertyjson/${projectId}/${flowId}/${propertyId}`,
    {
      method: 'DELETE',
    },
  );
}

export async function copyFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/copy', {
    method: 'PUT',
    data,
  });
}
