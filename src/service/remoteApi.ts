import { API_URL } from '../constants';

async function request<TResponse>(
  url: string,
  config?: RequestInit,
): Promise<TResponse> {
  try {
    const response = await fetch(`${API_URL}${url}`, config);
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default {
  get: <TR>(url: string) => request<TR>(url),

  post: <TBody extends BodyInit, TR>(url: string, body: TBody) => request<TR>(url, { method: 'POST', body }),
};
