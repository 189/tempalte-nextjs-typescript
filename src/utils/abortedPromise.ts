export const ABORT_REASON = "promise be aborted";

export interface IAbortedPromise<T> extends Promise<T> {
  abort: () => void;
}

export function abortedPromise<T>(originPromise: Promise<T>) {
  let abortFunc: any = null;
  const abortPromise = new Promise(function(_resolve, reject) {
    abortFunc = function() {
      reject(ABORT_REASON);
    };
  });

  const promiseChain = Promise.race<T | {}>([originPromise, abortPromise]);
  (promiseChain as IAbortedPromise<T>).abort = abortFunc;
  return promiseChain as IAbortedPromise<T>;
}
