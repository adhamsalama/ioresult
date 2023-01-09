export class Ok<T> {
  ok: true = true;
  val: T;
  constructor(val: T) {
    this.val = val;
  }
}

export class Err<E> {
  ok: false = false;
  val: E;
  constructor(e: E) {
    this.val = e;
  }
}

export type Result<T, E> = Ok<T> | Err<E>;

export default async function ioresult<T>(
  promise: Promise<T>
): Promise<Result<T, Error>> {
  let res: T;
  let err: Error;
  try {
    res = await promise;
    return new Ok(res);
  } catch (error) {
    err = error as Error;
    return new Err(err);
  }
}
