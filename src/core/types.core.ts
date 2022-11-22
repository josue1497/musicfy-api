export type CoreResponse<T> = { data?: T; error?: CoreError };
interface CoreError {
  message: any;
  code: string;
}
