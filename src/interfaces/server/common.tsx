interface ParamType {
    id: string;
  };
  
interface ContextType {
  params: ParamType;
};
interface ServerResponse {
  status: number;
}

export type { 
  ParamType, 
  ContextType,
  ServerResponse, 
};
  