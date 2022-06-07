export interface IApiResponse<T, U = Record<string, T>> {
    links?: {
      self: string;
      prev?: string;
      next?: string;
      last?: string;
    };
  
    data: U;
  
    errors?: any[];
  }
  