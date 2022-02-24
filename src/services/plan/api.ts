import { request } from 'umi';
import type { PlanInfo, PlanModel } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getPlanInfoGrid(
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
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/plan/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getPlanParentGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  id: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/plan/getparentgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      id,
    },
  });
}

export async function getPlanInfo(projectId: number, id: string) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/getinfo/${projectId}/${id}`, {
    method: 'GET',
  });
}
export async function getPlanInfoByPkid(pkid: number) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/getinfo/${pkid}`, {
    method: 'GET',
  });
}

export async function updatePlanInfo(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/updateinfo', {
    method: 'PUT',
    data,
  });
}

export async function getPlanModel(projectId: number, id: string) {
  return request<PlanModel>(`http://localhost:8081/api/plan/getmodel/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updatePlanChinlrenJson(data?: Record<string, any>) {
  return request<PlanInfo>('http://localhost:8081/api/plan/updatechinlrenjson', {
    method: 'PUT',
    data,
  });
}

export async function getPlanParentCount(projectId: number, id: string) {
  return request<number>(`http://localhost:8081/api/plan/getparentcount/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function createPlan(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/create', {
    method: 'POST',
    data,
  });
}

export async function deletePlan(pkid: number) {
  return request<string>(`http://localhost:8081/api/plan/delete/${pkid}`, {
    method: 'DELETE',
  });
}
