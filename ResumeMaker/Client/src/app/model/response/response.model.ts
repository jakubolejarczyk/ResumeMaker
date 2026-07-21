export interface ResponseModel<TBody> {
  success: boolean;
  message: string;
  body: TBody;
}
