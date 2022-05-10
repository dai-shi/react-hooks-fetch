export type FetchFunc<Input, Result> = (input: Input) => Promise<Result>;

export type FetchDesc<Input, Result> = {
  func: FetchFunc<Input, Result>;
};

export type FetchState<Input, Result> = {
  input: Input;
  result?: Result;
  error?: unknown;
  promise?: Promise<void>;
}
