export interface ResponseDTO<T> {
  Message: string;
  Success: boolean;
  Datas?: T[];
  Data: T;
}