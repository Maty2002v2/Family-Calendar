export default interface IResultFetchApi<T> {
  error: boolean;
  message: Array<T> | string;
}
